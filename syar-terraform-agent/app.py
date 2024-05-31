from flask import Flask, request, jsonify, stream_with_context, Response
from flask_cors import CORS
import os
import subprocess
import tempfile
import json
import threading

app = Flask(__name__)
CORS(app)

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong2"}), 200

@app.route('/upload', methods=['POST'])
def upload_terraform_files():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    sessionId = data.get('sessionId')
    files = data.get('files')

    if not sessionId:
        return jsonify({"error": "No sessionId provided"}), 400
    if not files:
        return jsonify({"error": "No files provided"}), 400

    @stream_with_context
    def generate_logs():
        with tempfile.TemporaryDirectory() as temp_dir:
            session_dir = os.path.join(temp_dir, sessionId)
            os.makedirs(session_dir)

            for file_info in files:
                file_name = file_info.get('fileName')
                file_content = file_info.get('fileContent')
                if not file_name or not file_content:
                    yield json.dumps({"error": "File must have a name and content"}) + '\n'
                    return

                file_path = os.path.join(session_dir, file_name)
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                with open(file_path, 'w') as file:
                    file.write(file_content)

            try:
                yield from run_terraform_command('init', session_dir)
                yield from run_terraform_command('plan', session_dir)
            except Exception as e:
                yield json.dumps({"error": str(e)}) + '\n'

    return Response(generate_logs(), content_type='application/json')

def run_terraform_command(command, directory):
    process = subprocess.Popen(['terraform', command], cwd=directory, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    def stream_output(out, err):
        for line in iter(out.readline, b''):
            yield json.dumps({"log": line.decode('utf-8').strip()}) + '\n'
        for line in iter(err.readline, b''):
            yield json.dumps({"error": line.decode('utf-8').strip()}) + '\n'
    
    def reader_thread(out, err):
        return stream_output(out, err)

    thread = threading.Thread(target=reader_thread, args=(process.stdout, process.stderr))
    thread.start()

    # Wait for the subprocess to finish
    process.wait()

    # Wait for the reader thread to finish
    thread.join()

    return stream_output(process.stdout, process.stderr)


@app.route('/upload-sync', methods=['POST'])
def upload_terraform_files_sync():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    sessionId = data.get('sessionId')
    files = data.get('files')

    if not sessionId:
        return jsonify({"error": "No sessionId provided"}), 400
    if not files:
        return jsonify({"error": "No files provided"}), 400

    with tempfile.TemporaryDirectory() as temp_dir:
        session_dir = os.path.join(temp_dir, sessionId)
        os.makedirs(session_dir)

        for file_info in files:
            file_name = file_info.get('fileName')
            file_content = file_info.get('fileContent')
            if not file_name or not file_content:
                return jsonify({"error": "File must have a name and content"}), 400

            file_path = os.path.join(session_dir, file_name)
            with open(file_path, 'w') as file:
                file.write(file_content)

        # Initialize and plan Terraform
        init_output, init_error = run_terraform_command_sync('init', session_dir)
        if init_error:
            return jsonify({"error": init_error}), 500

        plan_output, plan_error = run_terraform_command_sync('plan', session_dir)
        if plan_error:
            return jsonify({"log": plan_error}), 500

        return jsonify({"log": plan_output})

def run_terraform_command_sync(command, directory):
    process = subprocess.Popen(['terraform', command], cwd=directory, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    return stdout.decode('utf-8'), stderr.decode('utf-8')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    print(f"Port: {port}")
    app.run(host='0.0.0.0', port=port, debug=True)
