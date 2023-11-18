const kappaleRouter = require('express').Router()
const Kappale = require('../models/kappale')
const User = require('../models/user')
const middleWare = require('../utils/middleware')

const jwt = require('jsonwebtoken')


kappaleRouter.get('/', async (request, response) => {
	Kappale
		.find({})
		.then(kappaleet => {
			response.json(kappaleet)
		})
})

kappaleRouter.post('/', async (request, response) => {
	try {
		const body = request.body
		const decodedToken = jwt.verify(middleWare.tokenExtractor(request), process.env.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({error: 'token invalid' })
		}
		const user = await User.findById(decodedToken.id)

		const kappale = new Kappale({
			nimi: body.nimi,
			kappaleId: body.kappaleId,
			sanat: body.sanat,
			kategoria: body.kategoria,
			alkuperäinen: body.alkuperäinen
		})
		const savedKappale = await kappale.save()
		response.status(201).json(savedKappale)
	} catch (error) {
		return response.status(500).json({error: error.message})	
	}
})

module.exports = kappaleRouter


