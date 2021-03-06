import express from "express"
import AWS from 'aws-sdk';
import { postMessage } from './controllers/messageController.js';
import dotenv from "dotenv"

const app = express();
app.use(express.json())
dotenv.config();

const PROVIDER_REGION = process.env.AWS_PROVIDER_REGION
const PROVIDER_PORT = process.env.PROVIDER_PORT || 5500


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: PROVIDER_REGION,
});

app.post("/message", postMessage)

app.listen(PROVIDER_PORT, () => {
  console.log(`Provider is Listening on port ${PROVIDER_PORT}`)
})