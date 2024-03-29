import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB connect!");
} catch (error) {
    console.log(error);
}

const db = mongoClient.db("drivencracy-api");
export const collectionPoll = db.collection("poll");
export const collectionChoice = db.collection("choice");
export const collectionVote = db.collection("votes");