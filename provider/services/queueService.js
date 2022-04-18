import AWS from 'aws-sdk';

const listQueues = (queueName) => {
  const sqs = new AWS.SQS();
  return new Promise((resolve, reject) => {
    sqs.listQueues({ QueueNamePrefix: queueName }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 큐 생성
const createQueue = (queueName) => {
  const sqs = new AWS.SQS();
  return new Promise((resolve, reject) => {
    sqs.createQueue(({ QueueName: queueName }), (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export { listQueues, createQueue }