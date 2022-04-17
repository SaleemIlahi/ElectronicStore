
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51KnKE5SGvx4cn5WFyF39xdScpPO1gZvC9iaWTb8xKx3jA5NiDYhMQDi9ZyL8Rju0jzK6B4Pl13agzteel57UzDsr00ENQPZvvM');

// app.use(express.static("public"));
// app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return items;
};

const payment = async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items.price),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

module.exports = payment
