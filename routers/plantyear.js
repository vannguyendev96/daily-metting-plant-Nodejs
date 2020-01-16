const express = require('express');
const router = require('express-promise-router')();


const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session:false});

const PlanningYear = require('../controllers/planningYear');
//get all
router.route('/Getbyuser')
    .post(PlanningYear.GetAll);
//create
router.route('/')
    .post(PlanningYear.Create);
//delete
router.route('/:id')
    .delete(passportJWT, PlanningYear.Delete);
//update
router.route('/:id')
    .put(PlanningYear.Update);
//get by id
router.route('/:id')
    .get(passportJWT, PlanningYear.GetByID);

router.route('/searchText')
    .post(PlanningYear.Search);

router.route('/filter/:acction')
    .post(PlanningYear.FilterAcction);


module.exports = router;