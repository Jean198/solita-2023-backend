const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const tripRoute = require('./routes/tripRoute');
const stationRoute = require('./routes/stationRoute');
const errorHandler = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://helsinki-city-bikes-2023.netlify.app',
    ],
    credentials: true,
  })
);

//Routes middleware
app.use('/api/users', userRoute);
app.use('/api/trips', tripRoute);
app.use('/api/stations', stationRoute);

app.get('/', (req, res) => {
  res.send('HomeRoute');
});

//Error middleware
app.use(errorHandler);

//Connect to mongodb and Start server
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, console.log(`Server listening at port ${PORT}`));
});
