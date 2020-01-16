const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const planDailyMeetingSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String
  },
  note: {
    type: String
  },
  startDate: {
    type: Date
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

planDailyMeetingSchema.index({
  name: 'text',
  description: 'text',
  note: 'text'
}, {
  weights: {
    name: 100,
    description: 200,
    note: 200
  },
});

const PlanningDailyMeeting = mongoose.model('PlanDailyMeeting', planDailyMeetingSchema);

module.exports = PlanningDailyMeeting;