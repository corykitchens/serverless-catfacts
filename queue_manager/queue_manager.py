import os
import json
import boto3


class QueueManager(object):
    def __init__(self, queue_url, function_name):
        self.queue = self.Queue(queue_url)
        self.api = self.CatFactFunction(function_name)

    def send_message_to_queue(self):
        message = self.api.get_fact()
        res = self.queue.send_message(message)
        return res

    class Queue(object):
        def __init__(self,url):
            self.client = boto3.client('sqs')
            self.url = url

        def send_message(self, message):
            response = self.client.send_message(
                QueueUrl=self.url,
                MessageBody=message,
            )
            return response


    class CatFactFunction(object):
        def __init__(self, function_name):
            self.client = boto3.client('lambda')
            self.function_name = function_name

        def parse_response(self, payload):
            payload_as_json = json.loads(payload.read())
            body_as_json = json.loads(payload_as_json['body'])
            return body_as_json['fact']
        
        def get_fact(self):
            response = self.client.invoke(FunctionName=self.function_name)
            fact = self.parse_response(response['Payload'])
            return fact

def handler(event, context):
    queue_url = os.getenv('QUEUE_URL', None)
    catfact_function = os.getenv('CATFACT_FUNCTION', None)
    if not queue_url or not catfact_function:
      print('Error retrieving environmental variables')
      return None
    else:
      queue_manager = QueueManager(queue_url, catfact_function)
      response = queue_manager.send_message_to_queue()
      return response
