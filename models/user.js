const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//create a schema 
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdate: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    department: {
        type: String,
        default: 'DMS'
    }
});

userSchema.index({
    email: 'text',
    username: 'text'
  }, {
    weights: {
      email: 50,
      username: 50,
    },
  });

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password,salt);
        //
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword,this.password);
    } catch (error) {
        throw new Error(error);
    }
}

//create a model 
const User = mongoose.model('user',userSchema);

//export a model
module.exports = User;