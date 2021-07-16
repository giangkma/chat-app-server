import Joi from 'joi';

const login = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const register = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required().min(5),
    }),
};

export default {
    login,
    register,
};
