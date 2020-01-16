const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const plantyearSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String
  },
  endDate: {
    type: Date
  },
  completed: {
    type: Number,
    default: 0
  },
  done: {
    type: Boolean,
    default: false
  },
  userid: {
    type: String
  },
});

plantyearSchema.index({
  name: 'text',
  description: 'text',
  endDate: 'text',
  done: 'text'
}, {
  weights: {
    name: 100,
    description: 200,
  },
});

const PlantYear = mongoose.model('PlantYear', plantyearSchema);

module.exports = PlantYear;