
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cron = require('node-cron');
require('dotenv').config()
const equipRoute = require("./routes/equip.routes");
const userRoute= require("./routes/user.routes");
const authRoute= require("./routes/auth.routes");
const pingAndStore = require('./services/pingtest');
const cors = require('cors');

const app = express();
/*const pingRoute = require("./routes/Ping.routes");*/

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const equip = require('./models/equip');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware pour traiter les données JSON
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello');});
    
app.use('/equip.routes',equipRoute)
app.use('/user.routes',userRoute)
app.use('/auth.routes',authRoute)
app.use(cors())
pingAndStore('www.flesk.com'); // Remplacez 'www.example.com' par le domaine que vous souhaitez pinguer

const port = process.env.PORT || 3000; // You can use environment variables for port configuration

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


var database;


mongoose.
connect('mongodb+srv://erijbenamor6:adminadmin@erijapi.9b6fc2g.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to mongo')} ).catch((error)=>{
        console.log(error)
    })


