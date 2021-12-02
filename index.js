const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8081;
const jwt_secret = process.env.JWT_SECRET;
const connectionURL = process.env.CONNECTION_URL;

app.use(cors())
app.use(bodyParser.json());

mongoose.connect(connectionURL,{
    useNewURLParser : true,
    useUnifiedTopology : true
}).then(()=>console.log('conneted to db'))
  .catch((err)=>console.log(err))


// Api Endpoints
app.get('/test',(req, res) => {
    res.status(200).send('yes! server is running');
})
require('./routes')(app)

app.listen(port,()=>{
    console.log(`server is started on localhost:${port}`);
});
