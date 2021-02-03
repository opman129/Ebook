const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Configure Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`))