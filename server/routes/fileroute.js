// fileRoutes.js
const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

// Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads'); // Name of the GridFS collection
});

// Serve images
router.get('/files/:filename', (req, res) => {
  if (!gfs) {
    return res.status(500).json({ err: 'GridFS not initialized' });
  }

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err || !file) {
      return res.status(404).json({ err: 'No file found' });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

module.exports = router;
