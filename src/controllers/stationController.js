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

module.exports = {
  getStations,
  createStation,
};
