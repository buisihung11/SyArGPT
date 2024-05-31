import json
from pathlib import Path
import uuid
import boto3 

s3_client = boto3.client("s3")
upload_bucket = "syargpt-media-bucket"

def render_diagram(code_block): 

    file_name = f"{uuid.uuid4()}"
    file_path = f"/tmp/{file_name}"   
    print(file_path)
    code_block = code_block.replace("show=False", f"show=False, filename='{file_path}'")
    print(code_block)
    # replace ./resources with absolute path
    code_block = code_block.replace("./resources", str(Path(__file__).parent / "resources"))
    try:
        exec(code_block)
    except Exception as e:
        print(f"Error: {e}")
    
    # upload diagram to s3
    s3_file_name = f"{file_name}.png"
    if not Path(f"{file_path}.png").exists():
        return None
    s3_client.upload_file(f"{file_path}.png", upload_bucket, s3_file_name)
    
    return f"https://{upload_bucket}.s3.us-west-2.amazonaws.com/{file_name}.png"
    


def lambda_handler(event, context):
    if event.get("body"):
        event = json.loads(event["body"])
        
    print(f"Received event: {json.dumps(event)}")
    print(json.loads(json.dumps(event)))
    
    code_block = event["code_block"]
    image = render_diagram(code_block)
    
    return {
        "statusCode": 200,
        "body": json.dumps({
            "image": image
        }),
    }
    
if __name__ == "__main__":
    # Test the lambda function
    event = {
        "code_block": """
from diagrams import Cluster, Diagram
from diagrams.aws.analytics import Athena, Glue
from diagrams.aws.compute import Lambda
from diagrams.aws.database import DynamodbTable, Dynamodb
from diagrams.aws.integration import EventbridgeDefaultEventBusResource, Eventbridge
from diagrams.aws.ml import Comprehend
from diagrams.aws.storage import S3
with Diagram("PDF Chat Service", show=False):
    with Cluster("PDF Processing"):
        pdf_bucket = S3("PDF Bucket")
        pdf_processor = Lambda("PDF Processor")
        bedrock_embedding = Comprehend("Bedrock Embedding")
        glue_crawler = Glue("Glue Crawler")

    with Cluster("Vector Database"):
        vector_db = DynamodbTable("Vector Database")

    with Cluster("Text Storage"):
        text_chunks_bucket = S3("Text Chunks Bucket")

    with Cluster("Chat Service"):
        chat_lambda = Lambda("Chat Lambda")
        event_bus = EventbridgeDefaultEventBusResource("Event Bus")

    pdf_bucket >> pdf_processor >> bedrock_embedding >> vector_db
    pdf_processor >> glue_crawler >> text_chunks_bucket
    event_bus >> chat_lambda >> vector_db
    chat_lambda >> text_chunks_bucket
    chat_lambda >> bedrock_embedding

pdf_bucket >> "1. Upload PDF files"
event_bus >> "2. User chat request"
chat_lambda >> "3. Return chat response"
"""
    }
    
    response = lambda_handler(event, None)
    print(response)