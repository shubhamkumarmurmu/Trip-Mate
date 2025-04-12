const express = require('express');
const app = express();
const bodyparser= require('body-parser')
const cors = require('cors');
const mainRoutes = require('./Routes/route.js')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
const path = require('path');
const dotenv = require('dotenv').config({path: '/home/saidarshan74/Desktop/Tripmate/.env'})

// console.log(PORT)

app.use(cors())
app.use(bodyParser.json());

app.use('/discover',mainRoutes)



app.listen(PORT,()=>{
    console.log(`hmmmm running on port  ${PORT}`)
})
