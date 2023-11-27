const mongoose = require('mongoose')
const config = require('./config')

const connectToDatabase = async () => {
    mongoose.set('strictQuery', false)
    //en nää miksi tämä ei olisi hyvä ratkasu
    if (process.env.NODE_ENV !== 'test') {
        console.log('Yhdistetään, ', process.env.MONGODB_URI)
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Yhdistetty tietokantaan')
            })
            .catch((error) => {
                console.log('Virhe yhdistäessä tietokantaan: ', error.message)
            })
    }

}
module.exports = { connectToDatabase }