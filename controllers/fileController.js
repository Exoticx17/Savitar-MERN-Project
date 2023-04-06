const express = require('express');
const { ObjectID } = require('mongodb');
const gridfs = require('gridfs-stream');
const mongodb = require('mongodb');
const archiver = require("archiver");
const mongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://XFusional:cc1ss7abc@blogcluster.dvlp2.mongodb.net/Videos?retryWrites=true&w=majority'

const filePost = (req,res) => {
    try {
        const file = req.file;
        const originalname = file.originalname;
        const buffer = file.buffer;
        const mimetype = file.mimetype;
      
        mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
          if (err) {
            res.status(500).send({ message: 'Error connecting to database' });
          } else {
            const db = client.db('Videos');
            const bucket = new mongodb.GridFSBucket(db, { bucketName: 'files' });
      
            const uploadStream = bucket.openUploadStream(originalname, { contentType: mimetype, metadata: {name: req.query.name, description: req.query.description} });
      
            uploadStream.end(buffer, () => {
              res.send({ id: uploadStream.id });
              client.close();
            });
          }
        });
    } catch (err) {
        console.log(err) 
    }
}

const fileGetOne = async (req, res) => {
  try {
    const client = await mongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db('Videos');
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'files' });
    const files = await bucket.find({ _id: ObjectID(req.params.id) }).toArray();
    if (!files || files.length === 0) {
      res.status(404).send({ message: 'File not found' });
    } else {
      const file = files[0];
      res.set('Content-Type', file.contentType);
      bucket.openDownloadStream(file._id).pipe(res);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error retrieving file' });
  }
};

const fileGetMetadata = async (req, res) => {
  try {
    const client = await mongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db('Videos');
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'files' });
    const files = await bucket.find({ _id: ObjectID(req.params.id) }).toArray();
    if (!files || files.length === 0) {
      res.status(404).send({ message: 'File not found' });
    } else {
      const file = files[0];
      const metadata = { name: file.metadata.name, description: file.metadata.description };
      res.json(metadata);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error retrieving file metadata' });
  }
};


const fileGetAll = async (req, res) => {
  try {
    let client;
    client = await mongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db("Videos");
    const bucket = new mongodb.GridFSBucket(db, { bucketName: "files" });
    const files = await bucket.find().toArray();
    if (!files || files.length === 0) {
      res.status(404).send({ message: "No files found" });
    } else {
      res.send({ files });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving files" });
  }
};

const fileGet5 = async (req, res) => {
  try {
    let client;
    client = await mongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db("Videos");
    const bucket = new mongodb.GridFSBucket(db, { bucketName: "files" });
    const files = await bucket.find().toArray();
    if (!files || files.length === 0) {
      res.status(404).send({ message: "No files found" });
    } else {
      const randomFiles = [];
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * files.length);
        randomFiles.push(files[randomIndex]);
        files.splice(randomIndex, 1);
      }
      res.json(randomFiles);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving files" });
  }
};


const fileGetType = async (req,res) => {
  try {
    let client;
    client = await mongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db("Videos");
    const bucket = new mongodb.GridFSBucket(db, { bucketName: "files" });
    if(req.query.type == 'image'){
      bucket.find({contentType: 'image/jpeg' || 'image/png'}).toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
        return res.status(404).json({
            err: 'No files exist'
        });
        }
    
        // Files exist
        return res.json(files);
    });
    }
    else if(req.query.type == 'video'){
      bucket.find({contentType: 'video/mp4'}).toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
        return res.status(404).json({
            err: 'No files exist'
        });
        }
    
        // Files exist
        return res.json(files);
    });
    }
    else if(req.query.type == 'podcast'){
      bucket.find({contentType: 'video/mp3'}).toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
        return res.status(404).json({
            err: 'No files exist'
        });
        }
    
        // Files exist
        return res.json(files);
    });
    }

  } catch (err) {
    console.log(err)
  }
}

const fileGetSearch = async (req,res) => {
  const name = req.query.name;
  try {
    let client;
    client = await mongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db("Videos");
    const bucket = new mongodb.GridFSBucket(db, { bucketName: "files" });
      bucket.find({$text: {$search: name, $caseSensitive: false}}).toArray((err, files) => {
          // Check if files
          if (!files || files.length === 0) {
            return res.status(404).json({
              err: 'No files exist'
            });
          }
      
          // Files exist
          return res.json(files);
        });

  } catch (err) {
      console.log(err)
  }
}

const filePut = (req, res) => {
  try {
    const file = req.file;
    const originalname = file.originalname;
    const buffer = file.buffer;
    const mimetype = file.mimetype;

    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        res.status(500).send({ message: 'Error connecting to database' });
      } else {
        const db = client.db('Videos');
        const bucket = new mongodb.GridFSBucket(db, { bucketName: 'files' });

        // Delete the previous version of the file using the provided file ID
        bucket.delete(new mongodb.ObjectID(req.query.id), (err) => {
          if (err) {
            res.status(500).send({ message: 'Error deleting the previous version of the file' });
            client.close();
          } else {
            // Upload the new version of the file
            const uploadStream = bucket.openUploadStream(originalname, { contentType: mimetype, metadata: { name: req.query.name, description: req.query.description } });
            uploadStream.end(buffer, () => {
              res.send({ id: uploadStream.id });
              client.close();
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};


const fileDelete = (req, res) => {
  try {
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        res.status(500).send({ message: 'Error connecting to database' });
      } else {
        const db = client.db('Videos');
        const bucket = new mongodb.GridFSBucket(db, { bucketName: 'files' });

        // Delete the file using the provided file ID
        bucket.delete(new mongodb.ObjectID(req.query.id), (err) => {
          if (err) {
            res.status(500).send({ message: 'Error deleting the file' });
          } else {
            res.send({ message: 'File deleted successfully' });
            client.close();
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};



  
  
module.exports= {
    filePost,
    fileGetOne,
    fileGetMetadata,
    fileGetAll,
    fileGetType,
    fileGetSearch,
    filePut,
    fileDelete,
    fileGet5
}