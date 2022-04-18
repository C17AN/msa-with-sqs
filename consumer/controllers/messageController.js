import { receiveMessage, deleteMessage } from "../services/messageService.js"

const getMessage = async (req, res) => {
  console.log(req.body)
  const result = await receiveMessage(req.body.queueName, JSON.stringify(req.body.message))
  if (result.Messages) {
    const message = result.Messages[0]
    const { ReceiptHandle, Body } = message
    deleteMessage(req.body.queueName, ReceiptHandle)
    res.send(Body)
  } else {
    res.send("No messages in queue")
    return
  }
}

export { getMessage }