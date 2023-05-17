# backend-validation-express

##### Request data validation middleware using Joi for express in backend. This middleware allows you to validate req.body, req.query, req.params, req.headers. Also return the error message to the better format.

## Installation
`npm install backend-validation-express`

## Example

##### validation.js
```js
const { validator, Joi } = require("backend-validation-express");

const bodySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const querySchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
});

const paramsSchema = Joi.string().required();

const bodyValidator = validator({ body: bodySchema });
const queryValidator = validator({ query: querySchema });
const paramsValidator = validator({ params: paramsSchema });

module.exports = { 
    bodyValidator, 
    queryValidator, 
    paramsValidator 
};

```

##### index.js
```js
const express = require("express");
const { paramsValidator, queryValidator, bodyValidator } = require("./validation");

const app = express();

app.use(express.json());

app.post("/user", bodyValidator, (req, res, next) => {
    // Here, req.body has been validated.

    return res.status(200).json(req.body);
});

app.get("/user", queryValidator, (req, res, next) => {
    // Here, req.query has been validated.

    return res.status(200).json(req.query);
});

app.listen(3000, () => {
    console.log("Server listening on the port 3000");
});
```

### You can add multiple schema in single validator. Example:


##### validation.js
```js
const { validator, Joi } = require("backend-validation-express");

const bodySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string()
});

const querySchema = Joi.object({
    _id: Joi.string().required(),
    role: Joi.string().required(),
});

const commonValidator = validator({ body: bodySchema, query: querySchema });

module.exports = { commonValidator };


```

### Error Messages Format

##### Error message for validating only req.body in single validator
```sh
{
    "success": false,
    "errors": {
        "body": {
            "name": "name is required",
            "email": "email is required",
            "password": "password is required"
        }
    },
    "message": "Validation Error!"
}
```

##### Error message for validating req.body & req.query in single validator

```sh
{
    "success": false,
    "errors": {
        "body": {
            "name": "name is required",
            "email": "email is required",
            "password": "password is required"
        },
        "query": {
            "_id": "_id is required",
            "role": "role is required"
        }
    },
    "message": "Validation Error!"
}
```
