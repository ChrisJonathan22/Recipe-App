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
// Set the port number to 5000
const port = 5000;

const mongoURI = 'mongodb://chris:chris22@ds211774.mlab.com:11774/recipesdatabase';
let gfs;

// Handling the database errors
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', () => {
        // Init stream
        gfs = Grid(connect.db, mongoose.mongo, {useNewUrlParser: true});
        gfs.collection('uploads');
        console.log('Database connection successful');     
});

// This part isn't needed anymore since I'm sending the image or images over as strings.
// Create storage engine
const storage = new GridFsStorage({
        url: mongoURI,
        file: (req, file) => {
                return new Promise((resolve, reject) => {
                        crypto.randomBytes(16, (err, buf) => {
                                if(err) {
                                        return reject(err);
                                }
                                const filename = buf.toString('hex') + path.extname(file.originalname);
                                const fileInfo = {
                                        filename: filename,
                                        bucketName: 'uploads',
                                        // I spent a long time trying to figure out why the files weren't
                                        // being saved in uploads collection and the reason was because 
                                        // instead of using the bucketName property I previously used bucketname
                                        //  and because no error where thrown I had no idea what was wrong because
                                        //  I was able to save files to my main collection "recipes"  
                                };

                                resolve(fileInfo);
                        });
                });
        }
});

const upload = multer({ storage: storage });

// Creating a route for POST requests from the form
app.post('/upload',(req, res) => {
        // To upload multiple images it would be upload.array() and req.files and also you would have the change the type of the image within the schema from Object to Array since the result will be a list of images.
        const recipe = new recipes({ title: req.body.title, image: req.body.image, duration: req.body.duration, steps: req.body.steps });        
        recipe.save((err, recipes) => {
        if(err) console.log(err);
        console.log('New recipe successfully added...');
        // setTimeout(() => {res.redirect('http://localhost:3000/')}, 500);           
});
        // setTimeout(() => {res.redirect('http://localhost:3000/')}, 500);
});


// Find all recipes stored
app.get('/api/recipes', (req, res) => {
        recipes.find((err, data) => {
                if(err) console.log(err);
                else {
                        res.json({recipes: data});
                        console.log('Recipes successfully found.'); 
                }  
        });
});


// Basic route to get all files GET /files
app.get('/files', (req, res) => {
        gfs.files.find().toArray((err, files) => {
                // Check if files
                if (!files || files.length === 0) {
                        return res.status(404).json({
                                err: 'No files exist'
                        });
                }
                // Files exist
                return res.json(files);
        });
});

// Basic route to get a single file  GET /files/:filename
app.get('/files/:filename', (req, res) =>{
        gfs.files.findOne({filename: req.params.filename}, (err, file) => {
                // Check if file
                if (!file || file.length === 0) {
                        return res.status(404).json({
                                err: 'No file exists'
                        });
                }
                // File exists
                return res.json(file);
        });
});


// Basic route to display a single image  GET /image/:filename
app.get('/image/:filename', (req, res) =>{
        gfs.files.findOne({filename: req.params.filename}, (err, file) => {
                // Check if file
                if (!file || file.length === 0) {
                        return res.status(404).json({
                                err: 'No file exists'
                        });
                }
                // Check if image
                if(file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
                        // Read output to browser
                        const readstream = gfs.createReadStream(file.filename);
                        readstream.pipe(res);
                } else {
                        res.status(404).json({
                                err: 'Not an image'
                        });
                }
        });
});

// Receive a post request with the title, do a search and then return the found document.
app.post('/api/recipes/single', (req, res) => {
        recipes.findOne({title: req.body.title}, (err, data) => {
                if(err) console.log(err);
                else {
                        res.json(data);
                        console.log('Single recipe found');
                }
        });
});

app.listen(port, console.log(`The Recipe App is running on port: ${port}`));
