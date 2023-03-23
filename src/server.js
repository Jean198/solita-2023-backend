const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const tripRoute = require('./routes/tripRoute');
const errorHandler = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes middleware
app.use('/api/users', userRoute);
app.use('/api/trips', tripRoute);

app.get('/', (req, res) => {
  res.send('HomeRoute');
});

//Error middleware
app.use(errorHandler);

//Connect to mongodb and Start server
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, console.log(`Server listening at port ${PORT}`));
});
