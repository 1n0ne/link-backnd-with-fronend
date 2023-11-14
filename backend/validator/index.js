import { validationResult } from "express-validator";

export const runValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        let errorsList = errors.array().map((error) => error.msg);
        return res.status(422).send({
            message: errorsList[0],
        });
    }
    next();
};
