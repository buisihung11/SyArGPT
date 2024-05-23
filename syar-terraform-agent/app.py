from flask import Flask, request, jsonify
import os
import subprocess
import tempfile

app = Flask(__name__)

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
        init_output, init_error = run_terraform_command('init', session_dir)
        if init_error:
            return jsonify({"error": init_error}), 500

        plan_output, plan_error = run_terraform_command('plan', session_dir)
        if plan_error:
            return jsonify({"error": plan_error}), 500

        return jsonify({"plan": plan_output})

def run_terraform_command(command, directory):
    process = subprocess.Popen(['terraform', command], cwd=directory, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    return stdout.decode('utf-8'), stderr.decode('utf-8')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    print(f"Port: {port}")
    app.run(host='0.0.0.0', port=port, debug=True)
