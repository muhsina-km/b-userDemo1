const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");

const registerModel = require('./model/register')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://bloomingbuds245:bloomingbuds@cluster0.h4nmndz.mongodb.net/user?retryWrites=true&w=majority")

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    registerModel.findOne({email: email})
    .then(userr => {
        if(userr) {
            if(userr.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
   registerModel.create(req.body)
   .then(register => res.json(register))
   .catch(err => res.json(err))
})

app.listen(3005, () => {
    console.log("server is running")
})