const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {console.log("MongoDB Connected!")});

const clientSchema = mongoose.Schema({
    name: String,
    email: String,
    msg: String,
    optForFollowups: Boolean
})

const client_data = mongoose.model("client_datas", clientSchema)

module.exports = {
    client_data: client_data
}