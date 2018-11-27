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
        gfs = Grid(connect.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log('Database connection successful');     
});

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
                                        bucketName: 'uploads' 
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
app.post('/upload', upload.single('image'), (req, res) => {
        // To upload multiple images it would be upload.array() and req.files and also you would have the change the type of the image within the schema from Object to Array since the result will be a list of images.
//         const recipe = new recipes({ title: req.body.title, image: req.file, steps: req.body.steps });        
//         recipe.save((err, recipes) => {
//         if(err) console.log(err);
//         console.log('New recipe successfully added...');           
// });
        setTimeout(() => {res.redirect('http://localhost:3000/')}, 1000);
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


app.get('/api/recipes/images', (req, res) => {
        gfs.files.find((err, image) => {
                if(err) console.log(err);
                else {
                        const readstream = gfs.createReadStream(image);
                        readstream.pipe(res);
                        // res.json({recipes: image[0].image.size});
                        console.log('Recipes successfully found.'); 
                }  
        });
});


// Basic route to get all files
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


app.listen(port, console.log(`The Recipe App is running on port: ${port}`));
