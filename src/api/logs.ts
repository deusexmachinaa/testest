import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI!;

let cachedClient: MongoClient;
const client = new MongoClient(uri);

async function connectToDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  return cachedClient.db("devlogs");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDb();
  const logsCollection = db.collection("logs");

  switch (req.method) {
    case "GET":
      const logs = await logsCollection.find().toArray();
      res.status(200).json(logs);
      break;
    case "POST":
      const newLog = req.body.log;
      await logsCollection.insertOne({ log: newLog });
      res.status(201).json({ log: newLog });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

//안씀