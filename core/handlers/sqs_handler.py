import boto3
import json

# Initialize the SQS client
sqs = boto3.client('sqs')


class SQSHandler():
    def __init__(self, queue_url):
        self.queue_url = queue_url

    def send_message(self, message, group_id=None):
        payload = {
            "MessageBody": message,
            "QueueUrl": self.queue_url
        }
        if group_id:
            payload["MessageGroupId"] = group_id
        response = sqs.send_message(**payload) 

        print(f"Sent message to {self.queue_url}: {message}")

    def send_messages(self, messages, group_id=None):
        for message in messages:
            self.send_message(message, group_id=group_id)

    @staticmethod
    def get_message_lambda(event):
        try:
            messages = event['Records']
            if len(messages) > 0:
                if isinstance(messages[0]['body'], str):
                    return json.loads(messages[0]['body'])
                return messages[0]['body']
        except KeyError:
            print("No messages in the event")
            return None
