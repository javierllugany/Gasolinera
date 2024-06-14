const express = require('express'); //biblioteca que construye un servidor
const app = express();

const fpRoute = require('./routes/public');

app.use('/',fpRoute);

app.use('/public', express.static('./public'));

const PORT = 3095;

app.listen(PORT,() => console.log('server up and running at port',PORT));
