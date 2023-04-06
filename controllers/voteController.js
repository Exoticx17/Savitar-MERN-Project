const express = require('express');
const { ObjectID } = require('mongodb');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const User = require('../models/userModel');
const Vote = require('../models/voteModel')
const url = 'mongodb+srv://XFusional:cc1ss7abc@blogcluster.dvlp2.mongodb.net/Votes?retryWrites=true&w=majority'

const voteSheetPost = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ msg: 'Name is required' });
      }
  
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
  
      const voteSheet = await db.collection('voteSheet').insertOne({
        name,
        computer: 0,
        finance: 0,
        manufacturing: 0,
        agriculture: 0,
        medical: 0,
        education: 0,
        defense: 0,
        energy: 0,
        entertainment: 0,
        law: 0
      });
  
      client.close();
  
      res.status(201).json(voteSheet);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

  const addVote = async (req, res) => {
    const { id } = req.query;
    const industry = req.query.industry;
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
  
      const plusVote = await db
        .collection('voteSheet')
        .findOneAndUpdate(
          { _id: ObjectID(id) },
          { $inc: { [industry]: 1 } },
          { returnOriginal: false }
        );
  
      client.close();
  
      res.status(200).json(plusVote);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  };

  const deleteVote = async (req, res) => {
    const { id } = req.query;
    const industry = req.query.industry;
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
  
      const subVote = await db
        .collection('voteSheet')
        .findOneAndUpdate(
          { _id: ObjectID(id) },
          { $inc: { [industry]: -1 } },
          { returnOriginal: false }
        );
  
      client.close();
  
      res.status(200).json(subVote);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  };

  const getVoteSheet = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
      const voteSheet = await db.collection('voteSheet').findOne({
        _id: ObjectID(req.query.id),
      });
  
      client.close();
  
      if (!voteSheet) {
        return res.status(404).json({ message: 'Vote sheet not found' });
      }
  
      res.status(200).json(voteSheet);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const getAvgVotesPerIndustry = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
  
      const industries = [
        'computer',
        'finance',
        'manufacturing',
        'agriculture',
        'medical',
        'education',
        'defense',
        'energy',
        'entertainment',
      ];
  
      const numIndustries = industries.length;
  
      const totalVotes = await db
        .collection('voteSheet')
        .aggregate([
          {
            $group: {
              _id: null,
              totalVotes: {
                $sum: {
                  $sum: industries.map((industry) => `$${industry}`),
                },
              },
            },
          },
        ])
        .toArray();
  
      const avgVotesPerIndustry = totalVotes[0].totalVotes / numIndustries;
  
      client.close();
  
      res.status(200).json(avgVotesPerIndustry);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  };
  const getMedianVotesPerIndustry = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, {
        useUnifiedTopology: true,
      });
  
      const db = client.db('Votes');
  
      const pipeline = [
        {
          $group: {
            _id: null,
            computer: { $sum: '$computer' },
            finance: { $sum: '$finance' },
            manufacturing: { $sum: '$manufacturing' },
            agriculture: { $sum: '$agriculture' },
            medical: { $sum: '$medical' },
            education: { $sum: '$education' },
            defense: { $sum: '$defense' },
            energy: { $sum: '$energy' },
            entertainment: { $sum: '$entertainment' },
          },
        },
        {
          $project: {
            _id: 0,
            computer: 1,
            finance: 1,
            manufacturing: 1,
            agriculture: 1,
            medical: 1,
            education: 1,
            defense: 1,
            energy: 1,
            entertainment: 1,
          },
        },
      ];
  
      const avgVotesPerIndustry = await db.collection('voteSheet').aggregate(pipeline).toArray();
  
      const votesArr = Object.values(avgVotesPerIndustry[0]).sort((a, b) => a - b);
      const medianIndex = Math.floor(votesArr.length / 2);
      const medianVotes = votesArr.length % 2 === 0 ? [votesArr[medianIndex - 1], votesArr[medianIndex]] : [votesArr[medianIndex]];
  
      client.close();
  
      res.status(200).json(medianVotes);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  };
  
  const getMinMaxVotesPerIndustry = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, { useUnifiedTopology: true });
      const db = client.db('Votes');
      
      const result = await db.collection('voteSheet').aggregate([
        {
          $group: {
            _id: null,
            highest: { $max: { $max: ['$computer', '$finance', '$manufacturing', '$agriculture', '$medical', '$education', '$defense', '$energy', '$entertainment'] } },
            lowest: { $min: { $min: ['$computer', '$finance', '$manufacturing', '$agriculture', '$medical', '$education', '$defense', '$energy', '$entertainment'] } },
          },
        },
      ]).toArray();
  
      client.close();
  
      res.status(200).json(result[0]);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  };
  
  const getVotesColleges = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, { useUnifiedTopology: true });
      const db = client.db('Votes');
      const college = db.collection("colleges");
  
      const user = await User.findById(req.query.id).select('voted');
      const category = user.voted;
  
      const colleges = await college.aggregate([
        { $match: { itags: { $in: [category] } } },
        { $sample: { size: 4 } }
      ]).toArray();
  
      console.log(colleges);
  
      client.close();
      res.status(200).json(colleges);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  };
  
  
  const getIndustryVote = async (req, res) => {
    try {
      const client = await mongoClient.connect(url, { useUnifiedTopology: true });
      const db = client.db('Votes');
  
      const user = await User.findById(req.query.id).select('voted');
      const category = user.voted;
  
      const voteSheet = await db.collection('voteSheet')
        .findOne({ _id: ObjectID(req.query.sheetId) }, { projection: { [category]: 1 } });
  
      console.log(voteSheet);
  
      client.close();
      res.status(200).json(voteSheet);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  };
  
  
  
    

module.exports = {
    voteSheetPost,
    addVote,
    deleteVote,
    getVoteSheet,
    getAvgVotesPerIndustry,
    getMedianVotesPerIndustry,
    getMinMaxVotesPerIndustry,
    getVotesColleges,
    getIndustryVote
}