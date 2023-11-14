import {check} from 'express-validator'

export const productValdation = [
    check('id').isNumeric().withMessage('product is must be number')
];

export const creatproductValdation = [
    check('title').trim().notEmpty().withMessage('product must havea title')
];