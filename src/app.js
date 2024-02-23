const express = require("express");
require("dotenv").config();
const app = express();
require("./config");
const signupRoute = require("./routes/studentSignup");
const staffSignupRoute = require("./routes/staffSignup");
const studentLogin = require("./routes/studentLogin");
const staffLogin = require("./routes/staffLogin");
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`app is running on PORT : ${PORT}`)
});

app.use("/api", signupRoute);

app.use("/api", staffSignupRoute);

app.use("/api", studentLogin);

app.use("/api", staffLogin);


app.use('', require('./routes/studentRoutes'));
app.use('', require('./routes/adminRoutes'));