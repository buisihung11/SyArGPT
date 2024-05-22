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

import re
import os 
def extract_code_block(text):
    # Define the regex pattern to match text inside triple backticks
    pattern = r'```python\n(.*?)\n```'
    # Search for the pattern
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(1)
    else:
        return None
    

def get_result(session_id, message):

    llm = BedrockChat(
        # credentials_profile_name="default",
        model_id=os.getenv("MODEL_ID", "anthropic.claude-3-sonnet-20240229-v1:0")
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
            HumanMessagePromptTemplate.from_template("{question}"),
        ] 
    )


    history = DynamoDBChatMessageHistory(table_name="SessionTable", session_id=session_id)
    output_parser = StrOutputParser()

    chain = chat_template | llm | output_parser

    print("Invoking chain...")
    response = chain.invoke({"question": message, "history": history.messages})
    print("Chain invoked")
    print(response)
    history.add_user_message(message)
    history.add_ai_message(response)
    
    code_block = extract_code_block(response)
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
    
    return {
        "statusCode": 200,
        "body": json.dumps({
            "code_block": code_block,
            "explain": explain,
            "image": "https://syargpt-media-bucket.s3.us-west-2.amazonaws.com/e-commerce_platform_architecture.png"
        }),
    }
    

if __name__ == "__main__":
    # Test the lambda function
    event = {
        "session_id": "test",
        "message": "I want to create an e-commerce platform on AWS. Can you help me with the architecture diagram?"
    }
    response = lambda_handler(event, None)
    print(response) 