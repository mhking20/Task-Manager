const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Task : {
        type : String ,
        required : true
    },
    status : {
        type : Boolean,
        default : true
    }
});

module.exports = mongoose.model("Task" , schema);