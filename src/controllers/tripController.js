const Trip = require('../models/trip');
const asyncHandler = require('express-async-handler');

//Get all trips-----------------------------------------------------------------------------------
const getAllTrips = asyncHandler(async (req, res) => {
  console.log('Req. sent');
  const limit = parseInt(req.query.limit) || 15;
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search;
  const searchType = req.query.searchType;
  const offset = limit * page;

  let tripsCollection;
  let tripsCollectionCount;

  if (search) {
    //When searching for a specific trip
    tripsCollection = await Trip.find({
      [searchType]: { $regex: search, $options: 'i' },
    })
      .skip(offset)
      .limit(limit);
    tripsCollectionCount = await Trip.count({
      [searchType]: { $regex: search, $options: 'i' },
    });
  } else {
    //When not search, just rendering all trips by page
    tripsCollection = await Trip.find().skip(offset).limit(limit);
    tripsCollectionCount = await Trip.count();
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

module.exports = {
  getAllTrips,
};
