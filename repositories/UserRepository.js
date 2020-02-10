const User = require('../models/user');

class UserRepository {

  constructor(model) {
    this.model = model;
  }

  // return all todos
  findAll() {
    return this.model.find();
  }

  //find todo by the id
  findById(id) {
    return this.model.findById(id);
  }

  //search
  search(searchText){
    return this.model.find({ "$text": {"$search": searchText}});
  }

  checkAdmin(userid){
    return this.model.find({_id:userid,isAdmin:true});
  }

  //update todo
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { email: object.email,username: object.username,isActive: object.isActive,isAdmin: object.isAdmin, department: object.department } });
  }

}

module.exports = new UserRepository(User);