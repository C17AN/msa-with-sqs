import express from "express"
import AWS from 'aws-sdk';
import { getMessage } from './controllers/messageController.js';
import dotenv from "dotenv"

const app = express();
app.use(express.json())
dotenv.config();

const PROVIDER_REGION = process.env.AWS_PROVIDER_REGION
const CONSUMER_PORT = process.env.CONSUMER_PORT || 5501


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: PROVIDER_REGION,
});

app.get("/message", getMessage)

app.listen(CONSUMER_PORT, () => {
  console.log(`Consumer is Listening on port ${CONSUMER_PORT}`)
})