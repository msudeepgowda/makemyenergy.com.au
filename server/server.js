const express = require('express')
const cors = require("cors");
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

require('dotenv').config()

const app = express()

app.use(cors({
  // origin: 'https://makemyenergy.vercel.app',
  credentials: true,
}));

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const subscribersRouter = require("./routes/route")
app.use('/route', subscribersRouter)

app.listen(3000, function () {
  console.log("server running at https://52.39.44.2:8443/")
});
