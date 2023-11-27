const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const config = require('../utils/config')

const globalSetup = async () => {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create()
    const uri = instance.getUri()
    global.__MONGOINSTANCE = instance
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'))
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.testPort}`
  }

  await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`)
  console.log('\nYhdistetty testitietokantaan:', config.Database, process.env.MONGO_URI)
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
}

module.exports = globalSetup