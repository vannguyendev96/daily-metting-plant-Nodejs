const PlanningDailyMeeting = require('../models/planningDailyMeeting');

class PlanningDailyMeetingRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new todo
  create(name,description,note,startDate,endDate,completed,userid) {
    const newPlanDaily = { name,description,note,startDate,endDate,completed,userid, done: false };
    const planDaily = new this.model(newPlanDaily);

    return planDaily.save();
  }

  // return all todos

  findAll(idUser) {
    return this.model.find({userid: idUser});
  }

  //search
  search(searchText,idUser){
    return this.model.find({ "$text": {"$search": searchText},userid: idUser});
  }

  //filter planning year with done acction
  filterAcction(action,idUser){
    return this.model.find({done: action,userid: idUser})
  }

  //find todo by the id
  findById(id) {
    return this.model.findById(id);
  }

    // delete todo
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update todo
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name,description: object.description,
        note: object.note,
        startDate: object.startDate,
        endDate: object.endDate,
        completed: object.completed, 
        done: object.done } });
  }
}

module.exports = new PlanningDailyMeetingRepository(PlanningDailyMeeting);