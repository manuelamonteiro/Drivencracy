import { pollSchema } from "../schemas/pollSchema.js";

export function pollValidate(req, res, next) {

    const validationStatus = pollSchema.validate(req.body, { abortEarly: false });

    if (validationStatus.error) {
        const error = validationStatus.error.details.map((detail) => detail.message);
        res.status(422).send(error);
        return;
    };

    next();
};