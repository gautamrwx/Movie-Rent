const express = require('express');
const app = express();
const logger = require('./middleware/logger')
const genres = require('./routes/genres')
const home = require('./routes/home')


app.use(express.json())

//logging by custom muddlware
app.use(logger)

app.use('/api/genres/',genres)
app.use('/',home)

const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Listening on Port ${port} ..`));