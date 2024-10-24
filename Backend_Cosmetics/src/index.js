const express = require("express");
const dotenv= require('dotenv');
const mongoose = require("mongoose");
const routers = require("./routers");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors= require("cors")
dotenv.config()

const app= express()
const port= process.env.PORT || 3001

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser())
routers(app)

mongoose.connect(process.env.MONGODB)
    .then(()=> {
        console.log('Connect successfully!')
    })
    .catch((err)=>{
        console.log(err)
    })


app.listen(port,()=>{
    console.log('Server run in port ', + port)
})


