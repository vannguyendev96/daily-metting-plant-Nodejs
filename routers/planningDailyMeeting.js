const router = require('express-promise-router')();
const repository = require('../repositories/PlanningDailyMeetingRepository');
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session:false});

const PlanningDailyMeetingController = require('../controllers/planningDailymeeting');

//get all
router.route('/Getbyuser/:page')
    .post(PlanningDailyMeetingController.GetAll);
//create
router.route('/')
    .post(PlanningDailyMeetingController.Create);
//delete
router.route('/:id')
    .delete(passportJWT, PlanningDailyMeetingController.Delete);
//update
router.route('/:id')
    .put(PlanningDailyMeetingController.Update);
//get by id
router.route('/:id')
    .get(passportJWT, PlanningDailyMeetingController.GetByID);

router.route('/searchText')
    .post(PlanningDailyMeetingController.Search);

router.route('/filter/:acction')
    .post(PlanningDailyMeetingController.FilterAcction);

module.exports = router;
