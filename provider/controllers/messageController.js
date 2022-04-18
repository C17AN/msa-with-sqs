import { sendMessage } from "../services/messageService.js"

const postMessage = async (req, res) => {
  console.log(req.body)
  const result = await sendMessage(req.body.queueName, JSON.stringify(req.body.message))
  res.json({
    message: result
  })
}

export { postMessage }