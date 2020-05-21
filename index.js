const express = require('express');
const mongoose = require('mongoose')
const app = express();
const logger = require('./middleware/logger')
const genres = require('./routes/genres')
const home = require('./routes/home')
const customers = require('./routes/customers')
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
    .then(()=> console.log('Connected MongoDB'))
    .catch(() => console.error('Could Not Connect'));

app.use(express.json())

//logging by custom muddlware
app.use(logger)

app.use('/api/genres/',genres)
app.use('/',home)
app.use('/api/customers',customers)
app.use('/api/movies',movies)

const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Listening on Port ${port} ..`));