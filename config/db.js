/*
 * Database connection file.
 */
const mongoose = require("mongoose")

const dConnection = process.env.MONGO_URL

mongoose.connect(dConnection, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

db.once("open", () => {
    console.log("Connection Succeed")
})

db.on("error", () => {
    console.error("Error in Connect Mongo")
})

module.exports = mongoose