const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');

router.post('/', async(req, res) => {
  try {
    const data = req.body //assuming the request body contains the person data

    //create a new person document using the mongoose model
    const newMenu = new Menu(data);
    
    //save new person to database
    const response = await newMenu.save();
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
    const data = await Menu.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.get('/:tastetype', async (req, res)=> {
  try{
    const tastetype = req.params.tastetype;
    if (tastetype == 'spicy' || tastetype == 'sweet' || tastetype == 'sour') {
      const response = await Menu.find({taste: tastetype});
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(500).json({error: 'Invalid tastetype'});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

module.exports = router;