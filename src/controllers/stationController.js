const Station = require('../models/station');
const Trip = require('../models/trip');
const asyncHandler = require('express-async-handler');
const { generateUniqueId, generateFdi } = require('../services/station');

//Get all stations
const getStations = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search;
  const offset = limit * page;

  let stationsCollection;
  let stationsCollectionCount;

  if (search) {
    // When searching for stations
    stationsCollection = await Station.find({
      name: { $regex: search, $options: 'i' },
    })
      .skip(offset)
      .limit(limit);
    stationsCollectionCount = await Station.count({
      name: { $regex: search, $options: 'i' },
    });
  } else {
    //When rendering all stations without searching
    stationsCollection = await Station.find().skip(offset).limit(limit);
    stationsCollectionCount = await Station.count();
  }

  const allStations = await Station.find({}); //Getting all stations all at once, not by page. This is used to render all stations locations on the map.

  const totalPages = Math.ceil(stationsCollectionCount / limit); // The number of pages.

  res.status(200).send({
    data: stationsCollection,
    paging: {
      total: stationsCollectionCount,
      page: page,
      numberOfPages: totalPages,
    },
    allStations: allStations,
  });
});

//Getting single station information--------------------------------------------------------------------------------------
const getSingleStationInfo = asyncHandler(async (req, res) => {
  const station_id = req.params.id;

  const station = await Station.find({ id: [station_id] });
  if (!station) {
    res.status(404);
    throw new Error('station not found');
  }

  const stationDepartureTripsArray = await Trip.find({
    // All the departure trips from this station id
    departure_station_id: [station_id],
  });

  const stationReturnTripsArray = await Trip.find({
    // All return trips from this station id
    return_station_id: [station_id],
  });

  //Count trips that started  and those ended at a single station.
  const departureCounts = await Trip.find({
    departure_station_id: [station_id],
  }).count();
  const returnCounts = await Trip.find({
    return_station_id: [station_id],
  }).count();

  // Get popular  departure stations for single station view
  const popularDepartureStations = await Trip.aggregate([
    {
      $match: {
        return_station_id: station_id,
      },
    },
  ])
    .sortByCount('departure_station_name')
    .limit(5);

  // Get popular return stations for single station view
  const popularReturnStations = await Trip.aggregate([
    {
      $match: {
        departure_station_id: station_id,
      },
    },
  ])
    .sortByCount('return_station_name')
    .limit(5);

  //Function that calculates the average distances
  const averageDistance = async (stationTrips) => {
    var sum = 0;
    for (var i = 0; i < stationTrips.length; i++) {
      sum += stationTrips[i].covered_distance_m;
    }
    return sum;
  };

  //Calculate the average distances for the single station
  const averageDepartureDistance =
    (await averageDistance(stationDepartureTripsArray)) / departureCounts;
  const averageReturnDistance =
    (await averageDistance(stationReturnTripsArray)) / returnCounts;

  res.status(200).json({
    station,
    departureCounts,
    returnCounts,
    popularDepartureStations,
    popularReturnStations,
    averageDepartureDistance,
    averageReturnDistance,
  });
});

//Creating a new station
const createStation = asyncHandler(async (req, res) => {
  const newFDI = await generateFdi();

  const station = await Station.create({
    FID: newFDI,
    id: await generateUniqueId(),
    name: req.body.stationName,
    address: req.body.stationAddress,
    city: req.body.city,
    operator: req.body.operator,
    y: parseFloat(req.body.latitude),
    x: parseFloat(req.body.longitude),
  });
  res.status(200).json(station);
});

//update trip--------------------------------------------------------------------------------------------------------------

const updateStation = asyncHandler(async (req, res) => {
  const { stationName, stationAddress, city, operator, longitude, latitude } =
    req.body;
  console.log(req.body);
  const { id } = req.params;

  const station = await Station.find({ id: id });
  console.log(station);

  if (!station) {
    res.status(404);
    throw new Error('station not found');
  }

  // Update trip
  const updatedStation = await Station.findOneAndUpdate(
    { id: id },

    {
      FID: station.FID,
      id: station.id,
      name: stationName,
      address: stationAddress,
      city: city,
      operator: operator,
      y: parseFloat(latitude),
      x: parseFloat(longitude),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedStation);
});

//Delete trip
const deleteStation = asyncHandler(async (req, res) => {
  const station = await Station.findById(req.params.id);
  if (!station) {
    res.status(404);
    throw new Error('station not found');
  }
  await Station.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'station deleted successfully!' });
});

module.exports = {
  getStations,
  createStation,
  getSingleStationInfo,
  updateStation,
  deleteStation,
};
