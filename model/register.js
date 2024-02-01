const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique:true},
    password: String
});

const registerModel = mongoose.model("register", registerSchema);

module.exports = registerModel;