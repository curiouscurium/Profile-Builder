const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv/config');

const app = express()

if (process.env.DB_CONNECTION) {
    try {
      mongoose.connect(process.env.DB_CONNECTION, 
        {useNewUrlParser: true,useUnifiedTopology:true},
        () =>console.log('Connected to Database'));
    } catch (err) {
      console.log("errr  while connecting db", err);
    }
}

app.use(express.json())
app.use(express.urlencoded({
  extended:true
}));



app.use(cors());
app.use(cors({ origin: true }));

app.use(cookieParser())



app.use('/',require('./router/auth'))

// app.get('/',(req,res) =>{
//     console.log("Hello Profile")
    
// })



app.listen(9002 , () => {
    console.log("Server is running")
})