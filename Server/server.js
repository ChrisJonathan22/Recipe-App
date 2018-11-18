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
const { conn } = require('./database');
// Import model/ collection
const { recipes } = require('./database'); 


app.get('/api/customers', (req, res) => {
        const customers = [
                {id: 1, firstName: 'John', lastName: 'Doe'},
                {id: 2, firstName: 'Jane', lastName: 'Doe'},
                {id: 3, firstName: 'Mary', lastName: 'Doe'}
        ]
        res.json(customers);
});

app.listen(port, console.log(`The Recipe App is running on port ${port}`)
);