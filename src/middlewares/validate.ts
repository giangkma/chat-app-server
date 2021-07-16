import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { statusHTTP } from '../config';
import { MessageDetails } from '../domain/common.domain';
import { pick } from '../helpers/pick';

export const validate =
    (schema: any) =>
    (req: Request, res: Response, next: NextFunction): unknown => {
        const validSchema = pick(schema, ['params', 'query', 'body']);
        const object = pick(req, Object.keys(validSchema));
        const { error } = Joi.compile(validSchema)
            .prefs({ errors: { label: 'key' } })
            .validate(object);

        if (error) {
            const errorMessage = error.details
                .map((details: MessageDetails) => details.message)
                .join(', ');
            return next(
                res.status(statusHTTP.FAIL).send({ error: errorMessage }),
            );
        }
        return next();
    };
