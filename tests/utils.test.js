require('dotenv').config()
const config = require('../utils/config')

describe('Config liittyen', () => {

    const originalEnv = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...originalEnv }
    })
    afterAll(() => {   
        process.env = originalEnv
    })
    test('MONGODB_URI on määritelty', () => {
        console.log(config.MONGODB_URI)
        console.log(process.env.MONGODB_URI)
        console.log(process.env.TEST_MONGO_URI)
        console.log(config)
        expect(config.MONGODB_URI).toBeDefined()
    })
    test('PORT on määritelty', () => {
        expect(config.PORT).toBeDefined()
    })
    test('Memory on määritelty', () => {
        expect(config.Memory).toBeDefined()
    })
    test('IP on määritelty', () => {
        expect(config.IP).toBeDefined()
    })
    test('Database on määritelty', () => {
        expect(config.Database).toBeDefined()
    })
    test('testiympäristössä NODE_ENV on test', () => {
        process.env.NODE_ENV = 'test'
        const config = require('../utils/config')
        expect(config.MONGODB_URI).toBe(process.env.TEST_MONGO_URI)
    })
    test('tuotantoympäristössä NODE_ENV on production', () => {
        process.env.NODE_ENV = 'production'
        const config = require('../utils/config')
        expect(config.MONGODB_URI).toBe(process.env.MONGODB_URI)
    })
})

