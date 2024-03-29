import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { collectionPoll, collectionChoice, collectionVote } from "../database/db.js";

export async function postChoice(req, res) {

    const { title, pollId } = req.body;

    try {
        const pollExists = await collectionPoll.findOne({ _id: new ObjectId(pollId) });

        if (!pollExists) {
            res.status(404).send({ message: "A enquete não existe!" });
            return;
        }

        const pollExpire = pollExists.expireAt;

        const isExpired = dayjs().isAfter(pollExpire, 'days');

        if (isExpired) {
            res.status(403).send({ message: "A enquete expirou!" });
            return;
        }

        const titleExists = await collectionChoice.findOne({ title: title });

        if (titleExists) {
            res.status(409).send({ message: "A opção já existe!" });
            return;
        }

        const choice = {
            title: title,
            pollId: pollId
        }

        await collectionChoice.insertOne(choice);

        res.status(201).send(choice);
    } catch (error) {
        res.status(500).send(error);
    }

}

export async function postVote(req, res) {

    const id = req.params.id;

    try {
        const choiceExists = await collectionChoice.findOne({ _id: new ObjectId(id) });

        if (!choiceExists) {
            res.status(404).send({ message: "A opção não existe!" });
            return;
        }

        const pollExists = await collectionPoll.findOne({ _id: new ObjectId(choiceExists.pollId) });

        const pollExpire = pollExists.expireAt;

        const isExpired = dayjs().isAfter(pollExpire, 'days');

        if (isExpired) {
            res.status(403).send({ message: "A enquete expirou!" });
            return;
        }

        const vote = {
            createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
            choiceId: id
        };

        await collectionVote.insertOne(vote);

        res.status(201).send(vote);
    } catch (error) {
        res.status(500).send(error);
    }

}