import { Router } from "express";
import { getPoll, postPoll, getChoice, getResult } from "../controllers/poll.controller.js";
import { pollValidate } from "../middlewares/poll.middleware.js";

const router = Router();

router.post("/poll", pollValidate, postPoll);

router.get("/poll", getPoll);

router.get("/poll/:id/choice", getChoice);

router.get("/poll/:id/result", getResult);

export default router;