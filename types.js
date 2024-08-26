const zod = require("zod");

const clientSchema = zod.object({
    name: zod.string(),
    email: zod.string().email({ message: "Invalid email address" }),
    tel: zod.number(),
    msg: zod.string(),
})

module.exports = {
    clientSchema: clientSchema
}