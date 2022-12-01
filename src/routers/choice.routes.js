import { Router } from "express";
import { postChoice, postVote } from "../controllers/choice.controller.js";
import { choiceValidate } from "../middlewares/choice.middleware.js";

const router = Router();

router.post("/choice", choiceValidate, postChoice);

router.post("/choice/:id/vote", postVote);

export default router;