const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.static("./public"));
app.use(express.json());


const dotenv = require("dotenv");
dotenv.config();

const connectdb = require("./db/connectdb")
const port = 3001;

const router = require("./router/router")
app.use("/api/v1/task", router)

const start = async () => {
    try {
        await connectdb(process.env.URL);
        console.log('db connected');
        app.listen(port, () => {
            console.log(`The Server Is Running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()