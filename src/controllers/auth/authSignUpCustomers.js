const { handlerGenerateRandomPassword } = require('../../handlers/auth');
const { User } = require('../../schemas')
const { firebase } = require('../../config')

function generateRandomNumber(min, max) {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    return length;
}

const createCustomers = async (req, res) => {
    const length = generateRandomNumber(8, 30);
    try {

        const { email, firstName, lastName } = req.body
        const password = handlerGenerateRandomPassword(length)

        const user = {
            email: email,
            password: password,
            displayName: `${firstName} ${lastName}`,
            emailVerified: false,
            disabled: false,
        };

        const userFirebase = firebase.auth().createUser(user)
        if (!userFirebase) res.status().json('Error creating user')

        const userSnkrs = {
            email: email,
            firstName: firstName,
            lastName: lastName,
        }

        const newUser = new User(userSnkrs)
        const userCreated = await newUser.save()
        if (userCreated) res.status(200).json('The user was created successfully')
        else res.status(400).json('The user could not be created successfully')
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export default createCustomers