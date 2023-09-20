const mongoose = require("mongoose");
const { URL_MONGO_SNKRS } = require("./config");

const db = async () => {
    await mongoose.connect(URL_MONGO_SNKRS,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.log(error))
};

module.exports = db;