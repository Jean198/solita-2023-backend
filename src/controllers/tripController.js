const Trip = require('../models/trip');
const asyncHandler = require('express-async-handler');

//Get all trips-----------------------------------------------------------------------------------
const getAllTrips = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 15;
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search;
  const searchType = req.query.searchType;
  const offset = limit * page;

  let tripsCollection;
  let tripsCollectionCount;

  if (search && searchType) {
    //When searching for a specific trip
    tripsCollection = await Trip.find({
      [searchType]: { $regex: search, $options: 'i' },
    })
      .skip(offset)
      .limit(limit);
    console.log('I am running');
    console.log(searchType);
    console.log(search);
    tripsCollectionCount = await Trip.count({
      [searchType]: { $regex: search, $options: 'i' },
    });
  } else {
    //When not search, just rendering all trips by page
    tripsCollection = await Trip.find().skip(offset).limit(limit);
    tripsCollectionCount = await Trip.count();
    console.log('No its me I am running');
    console.log(tripsCollectionCount);
  }

  const popularDepartures = await Trip.aggregate() //Popular departure stations.
    .sortByCount('departure_station_name')
    .limit(5);
  const popularReturns = await Trip.aggregate() //Popular return stations
    .sortByCount('return_station_name')
    .limit(5);

  const totalPages = Math.ceil(tripsCollectionCount / limit);

  res.status(200).send({
    data: tripsCollection,
    paging: {
      total: tripsCollectionCount,
      page: page,
      numberOfPages: totalPages,
    },

    popularDepartureStations: popularDepartures,
    popularReturnStations: popularReturns,
  });
});

//Get single Trip
const getSingleTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('trip not found');
  }
  res.status(200).json(trip);
});

//Delete trip
const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('trip not found');
  }
  await Trip.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'trip deleted successfully!' });
});

//Create Trip--------------------------------------------------------------------------------------------------------
const createTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.create({
    departure_date: req.body.departureDate,
    return_date: req.body.returnDate,
    departure_station_id: req.body.departureStationId,
    departure_station_name: req.body.departureStationName,
    return_station_id: req.body.returnStationId,
    return_station_name: req.body.returnStationName,
    covered_distance_m: parseFloat(req.body.distance),
    duration_sec: parseFloat(req.body.duration),
  });
  res.status(200).json(trip);
});

//update trip--------------------------------------------------------------------------------------------------------------

const updateTrip = asyncHandler(async (req, res) => {
  const {
    departureDate,
    returnDate,
    departureStationId,
    departureStationName,
    returnStationId,
    returnStationName,
    distance,
    duration,
  } = req.body;
  const { id } = req.params;
  const trip = await Trip.findById(id);

  if (!trip) {
    res.status(404);
    throw new Error('trip not found');
  }

  // Update trip
  const updatedtrip = await Trip.findByIdAndUpdate(
    { _id: id },

    {
      departure_date: req.body.departureDate,
      return_date: req.body.returnDate,
      departure_station_id: req.body.departureStationId,
      departure_station_name: req.body.departureStationName,
      return_station_id: req.body.returnStationId,
      return_station_name: req.body.returnStationName,
      covered_distance_m: parseFloat(req.body.distance),
      duration_sec: parseFloat(req.body.duration),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(req.body);
  console.log(updatedtrip);

  res.status(200).json(updatedtrip);
});

module.exports = {
  getAllTrips,
  createTrip,
  getSingleTrip,
  deleteTrip,
  updateTrip,
};
