const { User, Product, Shopping } = require('../../schemas')

const getRecordByUserId = async () => {
    try {
        const { User_id } = req.locals
        const Record = await Shopping.find({ User_id })

    }
    catch (error) {

    }
}

module.exports = getRecordByUserId