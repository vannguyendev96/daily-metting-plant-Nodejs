const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const passportJWT = passport.authenticate('jwt', { session:false});
const passportLocal = passport.authenticate('local', {session:false});
//const router = express.Router;

const UserController = require('../controllers/users');
const { validateBody,schemas } = require('../helpers/routeHelpers');

router.route('/signup')
    .post(validateBody(schemas.authSchema),UserController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema),passportLocal,UserController.signIn);

router.route('/secret')
    //.get(UserController.secret);
    .get(passportJWT, UserController.secret);

router.route('/checkemail')
    .post(validateBody(schemas.authSchema),UserController.checkEmail);

router.route('/getallemail')
    .get( UserController.GetAllEmail);


router.route('/')
    //.get(UserController.secret);
    .get(passportJWT, UserController.GetAllUser);

router.route('/checkadmin')
    .post(UserController.CheckAdmin);

module.exports = router;