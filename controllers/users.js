const JWT  = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = require('../configuration/index');
const repository = require('../repositories/UserRepository');

//generate token
signToken = user =>{
    return JWT.sign({
        iss: 'DMSCodeWorkr',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1)
    }, 'VanNguyen');
}


module.exports ={
    signUp: async (req,res,next) => {
        const { email,password,username } = req.value.body;

        //check user
        const foundUser = await User.findOne({ email })
        if(foundUser){
            return res.status(403).json({ error : 'Email is already in use' })
        }
        const newUser = new User({ email,password,username});
        await newUser.save();

        //generate the token
        const token = signToken(newUser);

        res.status(200).json({ token });
    },

    signIn: async (req,res,next) => {
        const token = signToken(req.user);
        res.status(200).json({ 
            token: token,
            userid: req.user.id
        });
    },

    secret: async (req,res,next) => {
        console.log('secret call');
        res.json({ secret: "resource"})
    },

    //check email đã tồn tại hay chưa
    checkEmail: async (req,res,next) =>{
        const { email } = req.value.body;
        const foundUser = await User.findOne({ email })
        if(foundUser){
            return res.status(200).json({ message : 'Email này đã tồn tại' })
        }
        res.status(200).json({ message: "Bạn có thể sử dụng email này" });
    },

    //get all email system 
    GetAllEmail: async (req,res,next) =>{
        try {
            const list_user = await User.find();
            res.json({
                result: 'ok',
                data: list_user,
                message: "Query list of email user successfully"
            })
        } catch (error) {
            console.log(error)
            res.json({
                result: 'failed',
                data: {},
                message: "Query list of email user failed"
            })
        }
        
    },
    GetAllUser: async (req,res,next) =>{
        repository.findAll().then((User) => {
            res.json({
                result: 'ok',
                data: User,
                length: User.length,
                message:'get User successfully'
            })
          }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'get User failed' + error
        }));
    },
    CheckAdmin: async (req,res,next) => {
        const { userid } = req.body;
        repository.checkAdmin(userid).then((User) =>{
            if(User.length > 0){
                res.json({
                    result: 'ok',
                    message:'User is Admin'
                })
            }
            else{
                res.json({
                    result: 'failed',
                    message:'User is not Admin'
                })
            }
        }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'Check User failed' + error
        }));
    }

}