const zod = require("zod");

const clientSchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    tel: zod.number(),
    msg: zod.string(),
    optForFollowups: zod.boolean(),
})

module.exports = {
    clientSchema: clientSchema
}