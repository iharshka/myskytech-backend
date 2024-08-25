const { client_data } = require("../db")
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async function(req, res) {
    const clients = await client_data.find({});
    console.log("Clients data fetched successfully!")
    res.json({ statusCode: 200, msg: "Clients data fetched successfully!", data: clients });
})

app.post("/send-contact-details", async function (req, res) {
    const body = req.body;
    console.log(body);
    await client_data.create({
        name: body.name,
        email: body.email,
        tel: body.tel,
        msg: body.msg,
        optForFollowups: body.optForFollowups || false
    })
    console.log("Contact Details sent successfully!");
    res.status(200).json({
        statusCode: 200,
        msg: "Contact Details sent successfully!"
    })
})

app.use(function(err, req, res, next) {
    res.statusCode(500).json({
        msg: "Internal Server Error!"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})