const { client_data } = require("../db");
const { clientSchema } = require("../types");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

const masterUser = {
    username: process.env.USER,
    password: process.env.PASSWORD
}

function userExists(username, password) {
    if(username == masterUser.username && password == masterUser.password)
        return true;
    return false;
}

app.get("/", (req, res) => {
    res.send("Thank you for visiting this page. Functions previously in this route have been now moved to /signin & /clients routes.")
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!userExists(username, password))
        return res.json({statusCode: 401, msg: "Unauthorized access! Username & Password doesn't exist!"});
    const token = jwt.sign({username: username}, process.env.JWT_SECRET);
    console.log("User signed in successfully!")
    res.json({ statusCode: 200, msg: "User signed in successfully!", token: token });
})

app.get("/clients", async function(req, res) {
    const token = req.headers.authorization;
    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.username)
        {
            console.log("User authenticated, fetching client!")
            const clients = await client_data.find({});
            console.log("Clients data fetched successfully!")
            res.json({ statusCode: 200, msg: "Clients data fetched successfully!", data: clients});
        }
    }
    catch(error) {
        console.log("Forbidden, Invalid Authentication! Error:", error);
        return res.json({statusCode: 403, msg: "Forbidden, Invalid Authentication!"})
    }
})

app.post("/send-contact-details", async function (req, res) {
    const payload = req.body;
    // console.log(payload);
    // const parsedPayload = await clientSchema.safeParseAsync(payload);
    // if(!parsedPayload.success) {
    //     console.log(parsedPayload.success);
    //     console.log("Received wrong inputs!")
    //     return res.status(411).json({statusCode: 411, msg: "You sent the wrong inputs"})
    // }
    await client_data.create({
        name: payload.name,
        email: payload.email,
        tel: payload.tel,
        msg: payload.msg,
        optForFollowups: payload.optForFollowups || false
    })
    console.log("Contact Details sent successfully!");
    return res.status(200).json({
        statusCode: 200,
        msg: "Contact Details sent successfully!"
    })
})

app.use(function(err, req, res, next) {
    res.status(500).json({
        statusCode: 500,
        msg: "Internal Server Error!"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})