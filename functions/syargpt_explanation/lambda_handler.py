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


def get_result(session_id, message):

    config = {
        "max_tokens": 4000,
        "temperature": 0.1,
        "top_k": 1
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
                                """
                                Operational Excellence: Focuses on operations processes that run and monitor systems to deliver business value and to continually improve supporting processes and procedures.
Security: Encompasses the protection of information, systems, and assets while delivering business value through risk assessments and mitigation strategies.
Reliability: Ensures a workload performs its intended function correctly and consistently, including the ability to recover from failures and meet customer demands.
Performance Efficiency: Utilizes IT and computing resources efficiently to meet system requirements and to maintain efficiency as demand changes and technologies evolve.
Cost Optimization: Focuses on avoiding unnecessary costs by making good use of available resources.
Sustainability: Addresses the environmental impact of running cloud workloads, promoting strategies to reduce the carbon footprint of your architecture.
                                """
                                "Remember to generate diagrams in detail, describe components and services to use in the architecture"),
            MessagesPlaceholder(variable_name="history"),
            HumanMessagePromptTemplate.from_template(
                "Give me the explanation in the nice markdown format"),
        ]
    )

    history = DynamoDBChatMessageHistory(
        table_name="SessionTable", session_id=session_id)
    output_parser = StrOutputParser()

    chain = chat_template | llm | output_parser

    print("Invoking chain...")
    response = chain.invoke({"history": history.messages})
    print("Chain invoked")
    print(response)
    # history.add_user_message(message)
    # history.add_ai_message(response)

    explain = response
    try:
        explain = explain[explain.index("```") + 3:]
        explain = explain[explain.index("```") + 3:]
    except:
        pass

    return explain


def lambda_handler(event, context):
    # lambda get event from function url and return response
    if event.get("body"):
        event = json.loads(event["body"])

    print(f"Received event: {json.dumps(event)}")

    session_id = event["session_id"]
    message = event.get("message", "")

    explain = get_result(session_id, message)

    return {
        "statusCode": 200,
        "headers": {'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'},
        "body": json.dumps({
            "session_id": session_id,
            "explain": explain,
        }),
    }


if __name__ == "__main__":
    # Test the lambda function
    event = {
        "session_id": "testv2_5",
        # "message": "Cloud architecture for a service that can take PDF files and allow users to have AI chat sessions regarding the content of the PDF files.\n\n- Vectorize the PDF files using Bedrock's Embedding API\n- Store them on a cloud vector database\n- store the text chunks in a separate storage.\n\nDuring a chat session, when a user asks a question\n- turn the question in to a vector using Bedrock's embedding API\n- query the vector database\n- Use query result vectors to retrieve the associated text chunks.\n- Query Bedrock's chat API with the retrieved text chunks and the original user question\n- Return results from Bedrock's chat API to the user. Use AWS and Bedrock infrastructure where applicable."
        "message": "Design a banking system architecture"
        # "message": "\n      Everyday, there are projects/initiatives/developments which are initiated in the bank. Some of them\n      are complex enough to require serious efforts to create the right design of the solution. The design\n      includes but is not limited to software architecture, integration architecture, data architecture, with\n      consideration about security, maintainability, scalability, availability, etc. This task is often done in\n      collaboration between development teams and architecture team. However, due to limited capacity\n      of the centralized architecture team, some projects might need to wait and could not be processed\n      in expected time.\n      To solve this problem, the bank wants to leverage the power of generative AI and open knowledge\n      on Internet (for example: architecture blueprint shared by AWS, etc.) and on Intranet to help teams\n      and architects generate the first draft of designs based on the description of the requirements.\n    "
        # "message": "\n      A bank has an external facing web application that is deployed as a microservice using AWS\n      container and serverless services. After running the application on AWS for a year, we have\n      encountered various web application vulnerabilities that have led to the exploitation of\n      misconfigured AWS resources and coding issues.\n      We are looking for a solution that can proactively protect our web application from public attacks.\n      The solution should follow the OWASP Top 10 security standards. Additionally, the solution should\n      proactively monitor and ensure that all cloud resources adhere to cloud security best practices and\n      the bank's internal standards.\n      In summary, we need a solution that can:\n      • Protect the application from attacks by following OWASP Top 10 guidelines\n      • Proactively monitor our AWS resources to ensure proper configuration as per cloud security best\n      practices and the bank's standards\n      • Help avoid exploitation of misconfigurations and coding vulnerabilities in the future\n    "

    }
    response = lambda_handler(event, None)
    print(response)
