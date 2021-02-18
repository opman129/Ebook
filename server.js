const express = require('express');
const keys = require('./config/keys')
const bodyParser = require('body-parser');
const stripe = require('stripe')(keys.stripeSecretKey);
const exphbs = require('express-handlebars');
const path = require('path');

//Initialize Express App
const app = express();

//Middleware
//Set up Handlebars View engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get('/', (req,res) => {
    res.render('index', {
      stripePublishableKey: keys.stripePublishableKey
    });
});

//Create Stripe Charge Route
app.post('/charge', (req,res) => {
  const amount = 2500;
  
  stripe.customers.create({ 
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Web Development Ebook',
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => res.render('success'));
})

//Create Stripe checkout page
// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Stubborn Attachments",
//             images: ["https://i.imgur.com/EHyR2nP.png"],
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${port}/success.html`,
//     cancel_url: `${port}/cancel.html`,
//   });
//   res.json({ id: session.id });
// });

//Configure Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});