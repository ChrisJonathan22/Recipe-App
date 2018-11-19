// Export all the modules needed
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

// Create an express app
const app = express();
const port = 5000;

// Middlewares
app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use((req, res, next) => { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
});

// Import database
const { connect } = require('./database');
// Import model/ collection
const { recipes } = require('./database'); 

const mongoURI = 'mongodb://chris:chris22@ds211504.mlab.com:11504/recipes';
let gfs;

// Handling the database errors
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', () => {
        // Init stream
        gfs = Grid(connect.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log('Database connection successful');     
});

app.get('/api/recipes', (req, res) => {
        recipes.find({ title: 'Salmon' }, (err, data) => {
                if(err) console.log(err);
                else {
                        res.json({recipes: data});
                        console.log('Documents successfully found.');
                        
                }
                
        });
});

app.post('/api/addrecipe', (req, res) => {
        res.json({message: 'Recipe received'}, console.log('Another one!'));
});

app.listen(port, console.log(`The Recipe App is running on port ${port}`)
);


// const recipe = new recipes({ title: 'Salmon', image: [1,2,3], steps: 'do this and then do that' });
// recipe.save((err, recipes) => {
//         if(err) console.log(err);     
// });