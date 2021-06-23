const {check, validationResult} = require('express-validator');

exports.validateAuthUser = [
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
    check('password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Password cannot be empty!')
      .bail()
      .isLength({min: 6})
      .withMessage('Minimum 6 characters required in password!')
      .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(422)
            throw new Error(errors.array()[0].msg)
        }
        next();
    },
  ];

exports.validateRegisterUser = [
    check('name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Username can not be empty!')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required in Username!')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
    check('password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Password cannot be empty!')
      .bail()
      .isLength({min: 6})
      .withMessage('Minimum 6 characters required in password!')
      .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(422)
            throw new Error(errors.array()[0].msg)
        }
        next();
    },
  ];