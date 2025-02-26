import express from "express";
import cors from "cors";
import { connDB } from "./config/db.js";
import dotenv from "dotenv";
import User from "./module/user.module.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.post('/login', (req , res) => {
    const {email , password} = req.body
    User.findOne({email:email})
    .then(User => {
        if(User) {
            if (User.password === password) {
                res.json({ status: "Success" });
            }else{
                res.json("Password is incorect")
            }
        }else{
            res.json("user dont exist ")
        }
    })
})
app.post('/register' , (req , res) => {
    console.log("Received data:", req.body);
    User.create(req.body)
    .then(User => res.json(User))
    .catch(err => res.json(err))
})

connDB().then(() => {
    app.listen(PORT, () => {
        console.log("server running")
    })
}).catch((error) => {
    console.error("MongoDB coonection failed" , error)
    process.exit(1)
})