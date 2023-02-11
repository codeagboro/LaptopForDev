const express = require("express");
const { connectDB } = require("./laptop4dev.db/laptop4dev.db");
const router = require("./laptop4dev.route/laptop4dev.routes");

const app = express();
const port = 3456;
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome your new laptop is underway"
    });
});

app.use(router);

app.listen(port, () =>{
    console.log(`🚀🚀🚀🚀 server is running on ${port}`)
});


