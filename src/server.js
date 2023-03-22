const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);

//Error middleware
app.use(errorHandler);

//Connect to mongodb and Start server
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, console.log(`Server listening at port ${PORT}`));
});
