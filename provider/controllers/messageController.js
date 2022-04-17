const sendMessage = async (req, res) => {
  const result = await sendMessage(req.body.queueName, JSON.stringify(req.body.message))
  res.json({
    message: result
  })
}

export { sendMessage }