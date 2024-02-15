const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cron = require('node-cron');
require('dotenv').config()
const equipRoute = require("./routes/equip.routes");
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const cors = require('cors');
const pingAndStore = require('./services/pingtest');
const PingResult = require('./models/Ping');  // Import the PingResult model
const app = express();


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to process JSON data
app.use(express.json());

// CORS middleware
app.use(cors({
    origin: '*',
}));

app.get('/', (req, res) => {
    res.send('hello world');
});


app.use("/equip", equipRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);


app.get('/api/pingResults', async (req, res) => {
  try {
    const results = await PingResult.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
pingAndStore('www.flesk.com');
mongoose.
connect('mongodb+srv://erijbenamor6:adminadmin@erijapi.9b6fc2g.mongodb.net/Node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to mongo');
    })
    .catch((error) => {
        console.log(error);
    });
