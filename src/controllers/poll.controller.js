import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { collectionPoll, collectionChoice, collectionVote } from "../database/db.js";

export async function postPoll(req, res) {

    const { title, expireAt } = req.body;
    let currentTime;

    if (!expireAt) {
        currentTime = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm');
    }

    try {
        const poll = {
            title: title,
            expireAt: currentTime
        };

        await collectionPoll.insertOne(poll);

        res.status(201).send(poll);
    } catch (error) {
        res.status(500).send(error);
    }

}

export async function getPoll(req, res) {

    try {
        const pollList = await collectionPoll.find().toArray();

        res.status(200).send(pollList);
    } catch (error) {
        res.status(500).send(error);
    }

}