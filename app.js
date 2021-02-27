// Module from third party
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routing = require('./routes/routing');
const mongoose = require('mongoose');
const cors = require('cors');

// Module from local
require('dotenv/config');
const corsMidlleWare = require('./middlewares/cors');

// DB Connection
const stringConnection = process.env.DB_CONNECTION.replace('<NAME>', process.env.NAME).replace('<PASSWORD>', process.env.PASSWORD);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(stringConnection)
    .then(() => console.log('Connect DB Successfully'))
    .catch(err => console.log(err))

app.use(cors(corsMidlleWare));
app.use(bodyParser.json());
app.use('/', routing);

app.listen(process.env.PORT);