const mongoose = require("mongoose");
mongoose.set("strictQuery" , true)

const connectdb = async (url) => {
   return mongoose.connect(url)
}

module.exports = connectdb