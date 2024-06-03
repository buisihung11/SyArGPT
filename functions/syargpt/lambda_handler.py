import json
from langchain_core.messages import SystemMessage
from langchain_core.prompts import HumanMessagePromptTemplate
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import TextLoader
from langchain_community.chat_models import BedrockChat
from langchain_community.chat_message_histories import (
    DynamoDBChatMessageHistory,
)
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import MessagesPlaceholder

from core.utils.code_refactor import *
import os
import requests


DIAGRAM_ENDPOINT_URL = "https://4c4estd4fddcexfmuzvtnszlay0zyqhf.lambda-url.us-west-2.on.aws/"


def get_diagrams(code_block):
    response = requests.post(DIAGRAM_ENDPOINT_URL, json={
                             "code_block": code_block})
    if response.status_code == 200:
        response = response.json()
        return response["image"]

    return None


def get_result(session_id, message):

    config = {
        "max_tokens": int(os.getenv("MAX_TOKENS", 4000)),
        "temperature": float(os.getenv("TEMPERATURE", 0.01)),
        "top_k": float(os.getenv("TOP_K", 1)),
        "top_p": float(os.getenv("TOP_P", 0.01)),
    }

    llm = BedrockChat(
        # credentials_profile_name="default",
        model_id=os.getenv(
            "MODEL_ID", "anthropic.claude-3-sonnet-20240229-v1:0"),
        model_kwargs=config
        # model_id="anthropic.claude-v2:1"
    )

    loader = TextLoader("core/all_diagrams.txt")
    all_diagrams = loader.load()

    chat_template = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content="You are aws expert who is helping user generate AWS Architecture Diagram for their project. You will write code using Python Diagrams library\n" + 
                                f"You MUST use diagrams from list below and MUST NOT use anything else (Must use correct syntax, import, methods of library) {all_diagrams[0].page_content}\n" +
                                "Remember to generate diagrams in detail, describe components and services to use in the architecture"),
            MessagesPlaceholder(variable_name="history"),
            HumanMessagePromptTemplate.from_template(
                "{question}\n response the code block only in ```python ```. dont explain or write anything else\n\n"),
        ]
    )

    history = DynamoDBChatMessageHistory(
        table_name="SessionTable", session_id=session_id)
    output_parser = StrOutputParser()

    chain = chat_template | llm | output_parser

    print("Invoking chain...")
    response = chain.invoke({"question": message, "history": history.messages})
    print("Chain invoked")
    print(response)
    history.add_user_message(message)
    history.add_ai_message(response)

    code_block = ""
    try:
        code_block = extract_code_block(response)
        code_block = replace_wrong_methods(code_block)
        code_block = remove_unnecessary_blocks(code_block)
        code_block = fix_import_path(code_block)
        code_block = shorten_import(code_block)
        code_block = replace_wrong_methods(code_block)
        code_block = code_block.replace("diagram.render()", "")
    except Exception as e:
        print(f"Error: {e}")
        pass
    explain = response
    try:
        explain = explain[explain.index("```") + 3:]
        explain = explain[explain.index("```") + 3:]
    except:
        pass

    return code_block, explain


def lambda_handler(event, context):
    # lambda get event from function url and return response
    if event.get("body"):
        event = json.loads(event["body"])

    print(f"Received event: {json.dumps(event)}")

    session_id = event["session_id"]
    message = event["message"]

    code_block, explain = get_result(session_id, message)
    image = get_diagrams(code_block)

    return {
        "statusCode": 200,
        "headers": {'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'},
        "body": json.dumps({
            "session_id": session_id,
            "code_block": code_block,
            "explain": explain,
            "image": image
        }),
    }


if __name__ == "__main__":
    # Test the lambda function
    import uuid
    event = {
        "session_id": str(uuid.uuid4()),
        "message": "Cloud architecture for a service that can take PDF files and allow users to have AI chat sessions regarding the content of the PDF files.\n\n- Vectorize the PDF files using Bedrock's Embedding API\n- Store them on a cloud vector database\n- store the text chunks in a separate storage.\n\nDuring a chat session, when a user asks a question\n- turn the question in to a vector using Bedrock's embedding API\n- query the vector database\n- Use query result vectors to retrieve the associated text chunks.\n- Query Bedrock's chat API with the retrieved text chunks and the original user question\n- Return results from Bedrock's chat API to the user. Use AWS and Bedrock infrastructure where applicable."
        # "message": "Design a banking system architecture"
        # "message": "Add analytics components"
        # "message": "\n      Everyday, there are projects/initiatives/developments which are initiated in the bank. Some of them\n      are complex enough to require serious efforts to create the right design of the solution. The design\n      includes but is not limited to software architecture, integration architecture, data architecture, with\n      consideration about security, maintainability, scalability, availability, etc. This task is often done in\n      collaboration between development teams and architecture team. However, due to limited capacity\n      of the centralized architecture team, some projects might need to wait and could not be processed\n      in expected time.\n      To solve this problem, the bank wants to leverage the power of generative AI and open knowledge\n      on Internet (for example: architecture blueprint shared by AWS, etc.) and on Intranet to help teams\n      and architects generate the first draft of designs based on the description of the requirements.\n    "
        # "message": "\n      A bank has an external facing web application that is deployed as a microservice using AWS\n      container and serverless services. After running the application on AWS for a year, we have\n      encountered various web application vulnerabilities that have led to the exploitation of\n      misconfigured AWS resources and coding issues.\n      We are looking for a solution that can proactively protect our web application from public attacks.\n      The solution should follow the OWASP Top 10 security standards. Additionally, the solution should\n      proactively monitor and ensure that all cloud resources adhere to cloud security best practices and\n      the bank's internal standards.\n      In summary, we need a solution that can:\n      • Protect the application from attacks by following OWASP Top 10 guidelines\n      • Proactively monitor our AWS resources to ensure proper configuration as per cloud security best\n      practices and the bank's standards\n      • Help avoid exploitation of misconfigurations and coding vulnerabilities in the future\n    "

    }
    response = lambda_handler(event, None)
    print(response)
