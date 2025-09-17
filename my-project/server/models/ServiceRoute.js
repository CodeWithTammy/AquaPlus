

const express = require('express');
const router = express.Router();
const ServiceDetails = require('../models/ServiceDetails');



// GET details by ID
router.get('/servicedetails/:title', async (req, res) => {
  try {
    const details = await ServiceDetails.findById(req.params.id);
    if (!details) {
      return res.status(404).json({ error: 'Details not found' });
    }

     // Merge both documents into one response
    res.json({
      ...(service ? service.toObject() : {}),
      ...(details ? details.toObject() : {})
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

module.exports = router;
