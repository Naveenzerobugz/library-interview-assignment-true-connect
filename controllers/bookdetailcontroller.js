const bookdetail = mongoose.model("bookdetail");
const { validationResult } = require('express-validator');
const fs = require('fs');
const { type } = require('os');
module.exports = {
    add(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.id) {
            return bookdetail.findById(req.body.id)
                .then(result => {
                    if (!result) {
                        return res.status(200).send({ status: 1, message: 'No Book Found' })
                    }
                    result.update({
                            title: req.body.title,
                            bookcode: req.body.bookcode,
                            author: req.body.author,
                            publisher: req.body.publisher,
                            releasedate: new Date(req.body.releasedate),
                            booktype: req.body.booktype,
                            price: req.body.price,
                        }).then(result => {
                            return res.status(200).send({ status: 0, message: 'Book Updated Successfully' })
                        })
                        .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
                })
                .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
        }
        return bookdetail.find({ title: req.body.title, bookcode: req.body.bookcode, })
            .then(result => {
                if (result.length != 0) {
                    return res.status(200).send({ status: 1, message: 'This Book Already Exsist' })
                }
                return bookdetail.create({
                        title: req.body.title,
                        bookcode: req.body.bookcode,
                        author: req.body.author,
                        publisher: req.body.publisher,
                        releasedate: new Date(req.body.releasedate),
                        price: req.body.price,
                        booktype: req.body.booktype,
                        isdeleted: 0,
                    }).then(result => {
                        return res.status(200).send({ status: 0, message: 'Book Added Successfully' })
                    })
                    .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
            })
            .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })

    },
    list(req, res) {
        return bookdetail.aggregate([{
                $match: {
                    isdeleted: 0
                }
            }])
            .then(result => {
                return res.status(200).send({ status: 0, result: result })
            })
            .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
    },
    getbook(req, res) {
        return bookdetail.findOne({ _id: req.params.id, isdeleted: 0 })
            .then(result => {
                return res.status(200).send({ status: 0, result: result })
            })
            .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
    },
    delete(req, res) {
        return bookdetail.findById(req.body.id)
            .then(result => {
                if (!result) {
                    return res.status(200).send({ status: 1, message: 'No Data Found' })
                }
                result.update({
                        isdeleted: 1,
                    }).then(result => {
                        return res.status(200).send({ status: 0, message: 'Book Deleted Successfully' })
                    })
                    .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
            })
            .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
    },
    userwisebooklit(req, res) {
        let rawdata = fs.readFileSync('userlogin.json');
        let user = JSON.parse(rawdata);
        let userlogin = user.filter(ele => {
            return ele.username == req.body.username && ele.password == req.body.password
        })
        if (userlogin.length == 0) {
            return res.status(200).send({ status: 1, message: "Invalid User" })
        }
        let searchby = {}
        if (userlogin[0].type == 'premium') {
            searchby = {
                $match: {
                    isdeleted: 0,
                }
            }
        } else {
            searchby = {
                $match: {
                    isdeleted: 0,
                    booktype: 'free'
                }
            }
        }
        return bookdetail.aggregate([searchby])
            .then(result => {
                return res.status(200).send({ status: 0, result: result })
            })
            .catch(err => { return res.status(200).send({ status: 1, message: err.message }) })
    }
}