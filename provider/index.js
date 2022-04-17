const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const PROVIDER_REGION = process.env.AWS_PROVIDER_REGION || "ap-northeast-2"
const IDENTITY_POOL_ID = process.env.AWS_IDENTITY_POOL_ID || "ap-northeast-2:d8448107-1c92-40c3-8422-2de917034b45"

const AWScredentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: IDENTITY_POOL_ID });

AWS.config.update({
  region: PROVIDER_REGION, credentials: AWScredentials
});
const listQueues = () => {
  const sqs = new AWS.SQS();
  return new Promise((resolve, reject) => {
    sqs.listQueues(() => {

    })
  })
}
const sendMessage = (queueName, message) => {
  // sqs connection
  const sqs = new AWS.SQS();
  const params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.AWS_SQS_URI + queueName,
    DelaySeconds: 0
  }
  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}

app.post("/", async (req, res) => {
  const result = await sendMessage(req.body.queueName, JSON.stringify(req.body.message))
  res.json({
    message: result
  })
})

app.listen(process.env.PROVIDER_PORT, () => {
  console.log(`Listening on port ${PROVIDER_PORT}`)
})