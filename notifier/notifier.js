const AWS = require('aws-sdk');


const generateParams = (body, topicArn) => {
  return {
    Message: body,
    Subject: 'CAT FACT',
    TopicArn: topicArn
  }
}
const publishFactToSubscribers = (fact, cb) => {
  const snsTopicArn = process.env.SNS_TOPIC_ARN;
  const params = generateParams(fact, snsTopicArn);
  const sns = new AWS.SNS();
  sns.publish(params, cb);
}

const parseEventForFact = (event) => {
  const { Records } = event;
  const { body } = Records[0];
  return body;
}

exports.handler = (event, context, cb) => {
  fact = parseEventForFact(event);
  publishFactToSubscribers(fact, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  })
}