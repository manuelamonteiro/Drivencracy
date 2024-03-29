import joi from "joi";

export const pollSchema = joi.object({
    title: joi.string().required().trim(),
    expireAt: joi.optional()
});