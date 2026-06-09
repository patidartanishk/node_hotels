const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async(req, res) => {
  try {
    const data = req.body //assuming the request body contains the person data

    //create a new person document using the mongoose model
    const newPerson = new Person(data);
    
    //save new person to database
    const response = await newPerson.save();
    console.log('data saved successfully');
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.get('/', async(req, res) => {
  try {
    const data = await Person.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.get('/:worktype', async (req, res)=> {
  try{
    const worktype = req.params.worktype;
    if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
      const response = await Person.find({work: worktype});
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(500).json({error: 'Invalid worktype'});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // extract id from url
    const updatedPersonData = req.body; //updated data of person
    const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
      new: true, // return updated data
      runValidators: true, // run mongoose validations
    })
     if (! response) {
        return res.status(404).json({error: 'Person not found'});
      }
      console.log('data updated');
      res.status(200).json(response);
    } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // extract id from url
    const response = await Person.findByIdAndRemove(personId);
    
     if (! response) {
        return res.status(404).json({error: 'Person not found'});
      }
      console.log('data Deleted');
      res.status(200).json(response);
    } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
})

module.exports = router;