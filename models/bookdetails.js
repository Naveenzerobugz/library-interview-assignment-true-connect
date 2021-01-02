// Creating book schema
var schema = new mongoose.Schema({

    title: {
        type: String
    },
    bookcode: {
        type: String
    },
    author: {
        type: String
    },
    publisher: {
        type: String
    },
    releasedate: {
        type: Date,
    },
    price: {
        type: Number,
    },
    booktype: {
        type: String,
    },
    isdeleted: {
        type: Number,
        default: 0
    },

})


var bookdetail = new mongoose.model('bookdetail', schema);

module.exports = bookdetail;