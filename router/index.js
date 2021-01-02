var express = require("express");
var router = express.Router();
const { body, check } = require('express-validator');
const book = require("../controllers").book;

router.post('/bookdetails',
    body('bookcode').isLength({ min: 2 }).withMessage('bookcode must be at least 2 chars long'),
    body('title').isLength({ min: 5 })
    .withMessage('title must be at least 5 chars long'),

    book.add)
router.get('/bookdetails', book.list)
router.get('/bookdetails/:id', book.getbook)
router.post('/bookdetailsdelete', book.delete)
router.post('/userbasedbookdetails', book.delete)
router.post('/userlogin',
    check('username').notEmpty().withMessage('The username is required'),
    check('lastName').notEmpty().withMessage('The password is required'),
    // body('username').isEmpty().withMessage('username is required'),
    // body('password').isEmpty().withMessage('password is required'),
    book.userwisebooklit
)


module.exports = router;