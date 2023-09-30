require('dotenv').config();
const { TOKEN_MP } = process.env
const mercadopago = require('mercadopago');
const Shopping = require('../../schemas/Shopping');

const webhooks = async (req, res) => {
  try {
    mercadopago.configurations.setAccessToken(TOKEN_MP)
    const { id, topic } = req.query

    if (topic === 'merchant_order') {
      //el id en este caso corresponde al orderId
      const { response } = await mercadopago.merchant_orders.findById(id)
      await Shopping.findOneAndUpdate(
        { preferenceId: response.preference_id },
        {
          orderId: id,
          status: response.order_status === 'paid' ? 'approved' : 'inProgress'
        },
      );
    }

    if (topic === 'payment') {
      //el id en este caso corresponde al mercadoPagoId
      const { response } = await mercadopago.payment.findById(id)
      await Shopping.findOneAndUpdate(
        { orderId: response.order.id },
        {
          mercadoPagoId: response.id,
        },
      );
    }

    res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = webhooks;