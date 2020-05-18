var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  x: { type: Number, min: 0, max: 1000 },
  y: { type: Number, min: 0, max: 1000 }
  
});

var LogoSchema = new mongoose.Schema({
  id: String,
  height: { type: Number, min: 10, max: 1000 },
  width: { type: Number, min: 10, max: 1000 },
  text: [TextSchema],
  images: [String],
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 0, max: 150 },
  borderWidth: { type: Number, min: 0, max: 100 },
  padding: { type: Number, min: 0, max: 50 },
  margin: { type: Number, min: 0, max: 50 },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);