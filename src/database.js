const mongoose = require('mongoose')

//const URI = 'mongodb://localhost/mern-tasks';
const URI = 'mongodb+srv://Tobias:Salmo.83@cluster0.ulmpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(URI)
    .then(db => console.log('db esta conectada'))
    .catch(err => console.error(err))

module.exports = mongoose;
