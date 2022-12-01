import { choiceSchema } from "../schemas/choiceSchema.js";

export function choiceValidate(req, res, next) {

    const validationStatus = choiceSchema.validate(req.body, { abortEarly: false });

    if (validationStatus.error) {
        const error = validationStatus.error.details.map((detail) => detail.message);
        res.status(422).send(error);
        return;
    };

    next();
};