import AWS from 'aws-sdk';
import { listQueues } from './queueService.js';

const sendMessage = async (queueName, message) => {
  const listOfQueues = await listQueues(queueName)
  if (listOfQueues.QueueUrls.length === 0) {
    console.log("SQS Queue not found, creating new Queue...")
    await createQueue(queueName)
  }

  const sqs = new AWS.SQS();
  const params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.AWS_SQS_QUEUE_URI + queueName,
    DelaySeconds: 0
  }
  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log("error!", err)
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}

export { sendMessage }