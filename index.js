const { client_data } = require("./db")
const express = require("express");

const app = express();

app.use(express.json());

app.post("/send-contact-details", async function (req, res) {
    const body = req.body;
    console.log(body);
    await client_data.create({
        name: body.name,
        email: body.email,
        msg: body.msg,
        optForFollowups: body.optForFollowups || true
    })
    console.log("Contact Details sent successfully!");
    res.status(200).json({
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