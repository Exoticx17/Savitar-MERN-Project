const express = require('express');
const { ObjectID } = require('mongodb');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const College = require('../models/collegeModel')
const url = 'mongodb+srv://XFusional:cc1ss7abc@blogcluster.dvlp2.mongodb.net/Votes?retryWrites=true&w=majority'

const collegePost = async(req,res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes'); 
  
      const newCollege = await db.collection('colleges').insertOne({name: req.query.name, description: req.query.description, itags: req.query.itags});
  
      client.close();
  
      res.status(201).json(newCollege);

    } catch (err) {
        console.log(err)
    }
}

const getColleges = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
      const colleges = await db.collection('colleges').find().toArray();
  
      client.close();
  
      res.status(200).json(colleges);
    } catch (err) {
      console.log(err);
    }
  };

  const getCollegeOne = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
      const college = await db.collection('colleges').findOne({
        _id: ObjectID(req.query.id),
      });
  
      client.close();
  
      if (!college) {
        return res.status(404).json({ message: 'College not found' });
      }
  
      res.status(200).json(college);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const collegeEdit = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
  
      const filter = { _id: ObjectID(req.query.id) }; // filter by college ID
      const update = { $set: {name: req.query.name, description: req.query.description, itags: req.query.itags} }; // update with the request body
  
      const result = await db.collection('colleges').updateOne(filter, update);
  
      client.close();
  
      res.status(200).json(result); // return the update result
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const collegeDelete = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
  
      const filter = { _id: ObjectID(req.query.id) }; // filter by college ID
  
      const result = await db.collection('colleges').deleteOne(filter);
  
      client.close();
  
      res.status(200).json(result); // return the delete result
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports={
    collegePost,
    getColleges,
    getCollegeOne,
    collegeEdit,
    collegeDelete
}