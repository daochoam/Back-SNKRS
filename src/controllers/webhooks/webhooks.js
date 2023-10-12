require('dotenv').config();
const { TOKEN_MP, RESEND_SECRET } = process.env
const mercadopago = require('mercadopago');
const Shopping = require('../../schemas/Shopping');
const User = require('../../schemas/User');
const Product = require('../../schemas/Product');
const purchaseMailHandler = require('../../handlers/purchase/purchaseHandler');

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
        { new: true }
      );
    }

    if (topic === 'payment') {
      //el id en este caso corresponde al mercadoPagoId
      const { response } = await mercadopago.payment.findById(id)

      const findShopping = await Shopping.findOneAndUpdate(
        { orderId: response.order.id },
        { mercadoPagoId: response.id },
        { new: true }
      );
      const findUser = await User.findById(findShopping.User_id)

      const data = {
        //demás info necesaria para el mail
      };
      purchaseMailHandler(email, data);
    }

    res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = webhooks;