import { NextFunction, Request, Response } from "express";
import Joi from "joi";
interface IValidationSchema {
    body?: Joi.AnySchema<any>;
    params?: Joi.AnySchema<any>;
    query?: Joi.AnySchema<any>;
    headers?: Joi.AnySchema<any>;
}
declare const validator: (validationSchema: IValidationSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default { validator, Joi };
