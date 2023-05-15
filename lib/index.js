"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator = (validationSchema) => {
    return (req, res, next) => {
        var _a;
        try {
            let errorMessages = {};
            let errorExist = false;
            (_a = Object.keys(validationSchema)) === null || _a === void 0 ? void 0 : _a.map((key) => {
                var _a;
                let schema, reqData;
                if (key === 'body' && validationSchema.body) {
                    schema = validationSchema.body;
                    reqData = req.body;
                }
                else if (key === 'query' && validationSchema.query) {
                    schema = validationSchema.query;
                    reqData = req.query;
                }
                else if (key === 'params' && validationSchema.params) {
                    schema = validationSchema.params;
                    reqData = req.params;
                }
                else if (key === 'headers' && validationSchema.headers) {
                    schema = validationSchema.headers;
                    reqData = req.headers;
                }
                if (schema && reqData) {
                    const { error } = schema.validate(reqData, {
                        abortEarly: false,
                        errors: {
                            wrap: {
                                label: "",
                            },
                        },
                    });
                    if (error) {
                        errorExist = true;
                        let messages = {};
                        (_a = error.details) === null || _a === void 0 ? void 0 : _a.map((err) => {
                            messages[err.path[0]] = err.message;
                        });
                        errorMessages[key] = messages;
                    }
                }
            });
            // check the messages object is empty or not
            if (errorExist) {
                return res.status(422).send({ success: false, errors: errorMessages, message: "Validation Error!" });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = Validator;
