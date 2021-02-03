const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('Secret_Key');
const exphbs = require('express-handlebars')

const app = express();
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Configure Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`))