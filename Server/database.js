// adding mongoose to this file
const mongoose = require('mongoose');
require('dotenv').config();

// Initiating a connection to the database
// Make sure that the connection string has the db name after.net/ otherwise a new db called test will be created
// Therefore you will be looking at the wrong db
mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, { useNewUrlParser: true }); 
    
// Connecting to the database
const connect = mongoose.connection;

// Create a Schema or db structure
const recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    duration: String,
    steps: String,
    rating: Number
});

// Create a model/ collection
const Model = mongoose.model("Recipe", recipeSchema);

// console.log(connect);


// Export the connection and the model
module.exports.connect = connect;
module.exports.Model = Model;


