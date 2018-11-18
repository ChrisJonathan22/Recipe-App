// adding mongoose to this file
const mongoose = require('mongoose');

// Initiating a connection to the database
mongoose.connect('mongodb://chris:chris22@ds211504.mlab.com:11504/recipes', { useNewUrlParser: true }); 
    
// Connecting to the database
const connect = mongoose.connection;

// Create a Schema or db structure
let recipeSchema = new mongoose.Schema({
    title: String,
    image: Array,
    steps: String
});

// Create a model/ collection
const recipes = mongoose.model('recipes', recipeSchema);


// Export the connection and the model
module.exports.connect = connect;
module.exports.recipes = recipes;


