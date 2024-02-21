const mongoose = require("mongoose");
 const connection = mongoose.connect(process.env.MONGODB_URL).then(() => console.log("connected to db")).catch((err) => console.log(err));


module.export = connection;
