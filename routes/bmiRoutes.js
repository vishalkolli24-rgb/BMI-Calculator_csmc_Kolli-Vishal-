const express = require('express');
const router = express.Router();
const BmiRecord = require('../models/Bmi');

router.get('/', async (req, res) => {
  try {
    const records = await BmiRecord.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history records.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, age, height, weight, bmi, category } = req.body;
    
    if (!name || !age || !height || !weight || !bmi || !category) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newRecord = new BmiRecord({ name, age, height, weight, bmi, category });
    await newRecord.save();
    
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save record.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await BmiRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found.' });
    }
    res.status(200).json({ message: 'Record deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record.' });
  }
});

module.exports = router;
