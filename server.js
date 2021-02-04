const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('Secret_Key');
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
})

//Configure Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});