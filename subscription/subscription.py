import os
import boto3

class SubscriptionManager(object):
  def __init__(self, arn):
    self.client = boto3.client('sns')
    self.arn = arn
    self.valid_protocols = ['http', 'https', 'email', 'sms']
  
  def add_subscriber(self, protocol, endpoint):
    if protocol not in self.valid_protocols:
      return {
        'statusCode': 400,
        'body': 'Error invalid parameters'
      }
    else:
      response = self.client.subscribe(
        TopicArn=self.arn,
        Protocol=protocol,
        Endpoint=endpoint
      )
      if 'SubscriptionArn' in response:
        return {
          'statusCode': 200,
          'body': 'Subscription to topic successful'
        }

def handler(event, context):
  protocol = event['queryStringParameters']['protocol']
  endpoint = event['queryStringParameters']['endpoint']
  arn = os.getenv('SNS_TOPIC_ARN', None)
  if not arn:
    return {
      'statusCode': 400,
      'body': 'Invalid request'
    }
  subscription_manager = SubscriptionManager(arn)
  response = subscription_manager.add_subscriber(protocol, endpoint)
  return  response