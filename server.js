const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51IHEepF9udxImohAZ4ny9LUFJJpzALVaqxkOC7XJUwQELoidcQfDywdBQb0Bd5szN60CCxzLsTQZBStkw6on1xo700pA615ZJ9');
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
    res.render('index');
});

//Create Stripe checkout page
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${port}/success.html`,
    cancel_url: `${port}/cancel.html`,
  });
  res.json({ id: session.id });
});

//Configure Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});