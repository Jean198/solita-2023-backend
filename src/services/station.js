const Station = require('../models/station');
const getId = () => (1000 * Math.random()).toFixed(0);

async function generateUniqueId() {
  // generate a unique random id
  const id = getId();

  // check if the id already exists in the Mongoose field
  const count = await Station.countDocuments({ id: id }).exec();

  if (count === 0) {
    // id does not exist, return it
    return id;
  } else {
    // id exists, generate a new one
    return generateUniqueId();
  }
}

const generateFdi = async () => {
  // find the highest id in the Mongoose field
  const maxIdObj = await Station.findOne().sort({ FID: -1 }).exec();

  const maxId = maxIdObj ? maxIdObj.FID : 0;

  // generate the new id by adding 1 to the highest id
  const newFID = maxId + 1;
  return newFID;
};

module.exports = {
  generateUniqueId,
  generateFdi,
};
