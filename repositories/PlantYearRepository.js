const PlantYear = require('../models/plantyear');

class PlantYearRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new todo
  create(name,description,endDate,completed,userid) {
    const newPlantYear = { name,description,endDate,completed,userid, done: false, };
    const plantyear = new this.model(newPlantYear);

    return plantyear.save();
  }

  // return all todos
  findAll(idUser) {
    return this.model.find({userid: idUser});
  }

  //find todo by the id
  findById(id) {
    return this.model.findById(id);
  }

  //search
  search(searchText,idUser){
    return this.model.find({ "$text": {"$search": searchText},userid: idUser});
  }

  //filter planning year with done acction
  filterAcction(action,idUser){
    return this.model.find({done: action,userid: idUser})
  }

    // delete todo
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update todo
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name,description: object.description,endDate: object.endDate,completed: object.completed, done: object.done } });
  }
}

module.exports = new PlantYearRepository(PlantYear);