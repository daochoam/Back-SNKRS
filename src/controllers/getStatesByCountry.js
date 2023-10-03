const { Country, State } = require('../schemas')

const stateList = async (req, res) => {
    try {
        const { country } = req.params
        const countryRegex = new RegExp(country, 'i');
        const { _id } = await Country.find({ country: countryRegex })
        const { states } = await State.find({ Countries_id: country_id })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = stateList;