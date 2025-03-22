const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') // need to switch to come from a config file
 .then(() => console.log('Connected to MongoDB')) // better to use debug module for this
 .catch(err => console.error('Could not connect to MongoDB...', err))

 module.exports = mongoose;