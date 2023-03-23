const mongoose = require('mongoose');

//Trip schema
const tripSchema = mongoose.Schema({
  departure_date: {
    type: Date,
    default: Date.now(),
  },
  return_date: {
    type: Date,
    default: Date.now(),
  },

  departure_station_id: {
    type: String,
  },

  departure_station_name: {
    type: String,
    required: [true, 'Please add a  station name'],
    trim: true,
  },
  return_station_id: {
    type: String,
  },
  return_station_name: {
    type: String,
    required: [true, 'Please add a  station name'],
    trim: true,
  },
  covered_distance_m: {
    type: Number,
  },
  duration_sec: {
    type: Number,
  },
});

const Trip = mongoose.model('Trip', tripSchema, 'trips');

module.exports = Trip;
