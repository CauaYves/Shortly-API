import joi from 'joi';

export const urlschema = joi.object({
    id: joi.number().required(),
})