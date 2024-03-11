const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
require("./config");
const signupRoute = require("./routes/studentSignup");
const staffSignupRoute = require("./routes/staffSignup");
const studentLogin = require("./routes/studentLogin");
const staffLogin = require("./routes/staffLogin");
const bodyParser = require('body-parser');
const studentUsers = require("./routes/getStudentsUsers");
const staffUsers = require("./routes/getStaffUsers");
const signOut = require("./routes/signout");
const routeAuth = require("./middleware/jwtAuth")


const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`app is running on PORT : ${PORT}`)
});

app.use("", signupRoute);

app.use("", staffSignupRoute);

app.use("", studentLogin);

app.use("", staffLogin);

app.use("", routeAuth, studentUsers);

app.use("", routeAuth, staffUsers);

app.use("", signOut);


app.use('', require('./routes/studentRoutes'));
app.use('', require('./routes/adminRoutes'));