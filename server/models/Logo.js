var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  textArray: [{
    text: String,
    color: String,
    fontSize: { type: Number, min: 2, max: 144 },
    x: {type: Number, min: -1000, max: 1000},
    y: {type: Number, min: -1000, max: 1000}
  }],
  backgroundColor: String,
  borderColor: String,
  borderWidth: { type: Number, min: 0, max: 100 },
  borderRadius: { type: Number, min: 0, max: 100 },
  padding: { type: Number, min: 0, max: 100 },
  margin: { type: Number, min: 0, max: 100 },
  height: { type: Number, min: 40, max: 800 },
  width: { type: Number, min: 50, max: 1000 },
  imageArray: [{
    image: String,
    imageHeight: { type: Number, min: 0, max: 1000 },
    imageWidth: { type: Number, min: 0, max: 1000 },
    imageX: {type: Number, min: -1000, max: 1000},
    imageY: {type: Number, min: -1000, max: 1000}
  }],
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);