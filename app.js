const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const voteRoutes = require('./routes/voteRoutes')
const fileRoutes = require('./routes/fileRoutes')
const userRoutes = require('./routes/userRoutes')
const url = 'mongodb+srv://XFusional:cc1ss7abc@blogcluster.dvlp2.mongodb.net/Votes?retryWrites=true&w=majority'

const app = express();

// Middleware
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
    credentials: true, 
    origin: true
};
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.json()); 
app.use(cookieParser())
app.use(cors(corsOpts));

//Routes
app.use('/vote', voteRoutes); 
app.use('/file', fileRoutes)
app.use('/user', userRoutes)

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
