import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import routing from './routes/routing';
import mongoose from 'mongoose';
import cors from 'cors';
import corsMidlleWare from './middlewares/cors';

// Module from local
require('dotenv/config');

// DB Connection
const stringConnection = (process.env.DB_CONNECTION as string).replace('<NAME>', (process.env.NAME as string)).replace('<PASSWORD>', (process.env.PASSWORD as string));
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(stringConnection)
    .then(() => console.log('Connect DB Successfully'))
    .catch((err: any) => console.log(err))

app.use(cors(corsMidlleWare));
app.use(bodyParser.json());
app.use('/', routing);

app.listen(process.env.PORT);