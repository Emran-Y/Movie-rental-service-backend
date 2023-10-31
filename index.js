const mongoose = require('mongoose');
const morgan = require('morgan')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users')
const auth  = require('./routes/auth')
const express = require('express');
const app = express();

console.log(app.get('env'))

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
app.use(morgan('tiny'))
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users)
app.use('/api/auth',auth)

const port = process.env.PORT || 3011;
app.listen(port, () => console.log(`Listening on port ${port}...`));