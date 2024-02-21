const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
const app = express();
require("./config")
const signupRoute = require("./routes/studentSignup")

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => {
    console.log(`app is running on PORT : ${PORT}`)
});

app.use("/api", signupRoute)





