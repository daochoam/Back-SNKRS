require('dotenv').config();
const {
    TOKEN_MP,
    NOTIFICATION_URL,
    SUCCESS_URL,
    FAILURE_URL,
    PENDING_URL } = process.env
const mercadopago = require('mercadopago');

const createOrderMP = async (itemsPreference) => {
    mercadopago.configure({ access_token: TOKEN_MP });
    const preference = {
        items: itemsPreference,
        notification_url: NOTIFICATION_URL,
        back_urls: {
            success: SUCCESS_URL,
            pending: PENDING_URL,
            failure: FAILURE_URL,
        },
        auto_return: "approved"
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        return {
            init_point: response.body.init_point,
            id: response.body.id,
        };
    } catch (error) {
        console.error(error);
        throw Error({ message: "Error creating payment preference" });
    }
}
module.exports = createOrderMP;
