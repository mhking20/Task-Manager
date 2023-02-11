const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.use(express.static("./public"));
app.use(express.json());


const dotenv = require("dotenv");
dotenv.config();

const connectdb = require("./db/connectdb")
const port = 3001;

const router = require("./router/router");
app.use("/api/v1/task", router)

const start = async () => {
    try {
        await connectdb("mongodb+srv://mian_taimoor_20:king@mycluster.edewh2u.mongodb.net/Task_Manager?retryWrites=true&w=majority");
        console.log('db connected');
        app.listen(port, () => {
            console.log(`The Server Is Running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();