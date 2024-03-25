const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
require("./config");
const cors = require("cors")
const signup = require("./routes/signup");
const login = require("./routes/userlogin");
const bodyParser = require('body-parser');
const Users = require("./routes/getUsers");
const signOut = require("./routes/signout");
const assignadmin = require("./routes/assignAdmin");
const disadmin = require("./routes/disAdmin");
const User = require("./schema/signupSchema");
const user = require("./routes/user")
const getFile = require("./routes/getFile");
const authenticateToken = require("./middleware/jwtAuth");


const PORT = process.env.PORT || 3001;
app.use("Public", express.static("files"))
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('Public'))
app.use(cors({
    origin: ["http://localhost:5173", "https://faculty-journal.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.listen(PORT, () => {
    console.log(`app is running on PORT : ${PORT}`)
});

app.use("", signup);

app.use("", login);

app.use("", user);

app.use("", Users);

app.use("", signOut);

app.use("", assignadmin);

app.use("", disadmin);

app.use("", getFile);


app.use('', require('./routes/studentRoutes'));
app.use('', require('./routes/adminRoutes'));