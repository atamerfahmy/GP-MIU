const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
     url: {
          type: String,
          required: false
     },
     fileId: {
          type: String,
          required: false
     }
});

module.exports = Photo = mongoose.model('Photo', PhotoSchema);
