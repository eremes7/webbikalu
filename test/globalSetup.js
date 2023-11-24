const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const config = require('../utils/config'); // Muuta polkua tarvittaessa

module.exports = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    global.__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};