const express = require('express');
const cors = require('cors');
require('dotenv').config();
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
const member = require("./member");
const coronaData = require("./coronaData")
const auth = require("./auth");
const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with the request (if applicable)
  }));

app.use(express.json());
// app.use(express.urlencoded()) 
app.use('/auth', auth);
app.use('/member', member);
app.use('/corona-data',coronaData);

app.listen(3001, () => {
    console.log('server is up and running')
});
