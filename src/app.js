const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
require("./config");
const signup = require("./routes/signup");
const login = require("./routes/userlogin");
const bodyParser = require('body-parser');
const Users = require("./routes/getUsers");
const signOut = require("./routes/signout");
const routeAuth = require("./middleware/jwtAuth");
const assignadmin = require("./routes/assignAdmin");
const disadmin = require("./routes/disAdmin");
const adminStatus = require("./middleware/adminStatus");


const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.listen(PORT, () => {
    console.log(`app is running on PORT : ${PORT}`)
});

app.use("", signup);

app.use("", login);

app.use("", routeAuth, Users);

app.use("", signOut);

app.use("", adminStatus, assignadmin);

app.use("", adminStatus, disadmin);


app.use('', require('./routes/studentRoutes'));
app.use('', require('./routes/adminRoutes'));