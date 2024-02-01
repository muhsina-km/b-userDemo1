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

// app.post('/register', (req, res) => {
//    registerModel.create(req.body)
//    .then(register => res.json(register))
//    .catch(err => res.json(err))
// })

app.post('/register', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await registerModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered. Please login.' });
      }
  
      // If the email doesn't exist, proceed with registration
      registerModel.create(req.body)
        .then(register => res.status(201).json({ message: 'Registration successful.', data: register }))
        .catch(err => res.status(500).json({ message: 'Internal server error.', error: err }));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  })

app.listen(3005, () => {
    console.log("server is running")
})