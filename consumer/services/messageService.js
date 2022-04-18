import AWS from 'aws-sdk';

const deleteMessage = async (queueName, receiptHandle) => {
  const sqs = new AWS.SQS()
  const params = {
    QueueUrl: process.env.AWS_SQS_QUEUE_URI + queueName,
    ReceiptHandle: receiptHandle
  }
  return new Promise((resolve, reject) => {
    sqs.deleteMessage(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const receiveMessage = async (queueName) => {
  const sqs = new AWS.SQS();
  const params = {
    QueueUrl: process.env.AWS_SQS_QUEUE_URI + queueName,
  }
  return new Promise((resolve, reject) => {
    sqs.receiveMessage(params, (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

export { receiveMessage, deleteMessage }