require('dotenv').config();
const { TOKEN_MP, RESEND_SECRET } = process.env
const mercadopago = require('mercadopago');
const Shopping = require('../../schemas/Shopping');
const User = require('../../schemas/User');
const Product = require('../../schemas/Product');
const { Resend } = require('resend');

const webhooks = async (req, res) => {
  try {
    mercadopago.configurations.setAccessToken(TOKEN_MP)
    const resend = new Resend(RESEND_SECRET);

    const { id, topic } = req.query

    if (topic === 'merchant_order') {
      //el id en este caso corresponde al orderId
      const { response } = await mercadopago.merchant_orders.findById(id)

      const shopping1 = await Shopping.findOneAndUpdate(
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

      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'snkrstore.henry@gmail.com',
        subject: 'Confirmed purchase',
        html: `<h1><strong>Purchase Confirmation</strong></h1>
        <p>Thank you for your purchase!</p>
        <p>We have received your order for a pair of sneakers.</p>
        <p>Purchase details:</p>
        <ul>
            <li>Id Purchase: ${findShopping?._id}</li>
            <li>Price: $${findShopping?.payment}</li>
            <li>Purchase Date: ${findShopping?.purchase_date}</li>
            <li>Payment Id: ${findShopping?.id}</li>
            <li>Shipping guide: </li>
        </ul>
        <p>We will send you a tracking email once your order has been shipped.</p>
        <p>If you have any questions or need further assistance, feel free to contact us.</p>
        <p>Thank you again for your purchase!</p>`

      });
    }

    res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = webhooks;