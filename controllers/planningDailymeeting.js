const JWT  = require('jsonwebtoken');
const planningDailyMeeting = require('../models/planningDailyMeeting');
const repository = require('../repositories/PlanningDailyMeetingRepository');

module.exports ={
    GetAll: async (req,res,next) => {
        let {userid} = req.body;
        var perPage = 10
        var page = req.params.page || 1
        repository.findAll(userid,perPage,page).then((PlanDailyMeeting) => {
            repository.countAll(userid).then((dataplanning) => {
                res.json({
                    result: 'ok',
                    data: PlanDailyMeeting,
                    length: PlanDailyMeeting.length,
                    pagecount: Math.ceil(dataplanning.length / perPage),
                    currentpage: page,
                    message:'get Plan Daily Meeting successfully'
                })
            });

            
          }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'get Plan Daily Meeting failed' + error
        }));
    },
    Create: async (req,res,next) => {
        let { name,description,note,startDate,endDate,completed,userid} = req.body;
        repository.create(name,description,note,startDate,endDate,completed,userid).then((PlanDailyMeeting) => {
        //res.json(PlantYear);
            res.json({
                result: 'ok',
                data: PlanDailyMeeting,
                message:'Insert Plan Daily Meeting successfully'
            })
            }).catch((error) => res.json({
                result: 'failed',
                data: {},
                message:'Insert Plan Daily Meeting failed' + error
            }));
    },
    Delete: async (req,res,next) => {
        const { id } = req.params;
        repository.deleteById(id).then((ok) => {
            res.status(200).json([]);
        }).catch((error) => console.log(error));
    },
    Update: async (req,res,next) => {
        const { id } = req.params;
        const planDailyMeeting = { name: req.body.name,
            description: req.body.description,
            note: req.body.note,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            completed: req.body.completed,
            done: req.body.done}
        repository.updateById(id,planDailyMeeting).then((ok) =>{
            res.status(200).json([]);
        }).catch((error) => console.log(error));
    },
    GetByID: async (req,res,next) => {
        const { id } = req.params;
        repository.findById(id).then((planDailyMeeting) => {
            res.json({
                result: 'ok',
                data: planDailyMeeting,
                lengh: planDailyMeeting.lengh,
                message:'get plan Daily Meeting successfully'
            })
        }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'get plan Daily Meeting failed' + error
        }));
    },
    //search
    Search: async (req,res,next) =>{
        const { keyword,userid } = req.body;
        repository.search(keyword,userid).then((planDailyMeeting) =>{
            res.json({
                result: 'ok',
                data: planDailyMeeting,
                lengh: planDailyMeeting.lengh,
                message:'search plan Daily Meeting successfully'
            })
        }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'search plan Daily Meeting failed' + error
        }));
    },
    //filter
    FilterAcction: async (req,res,next) =>{
        const { acction } = req.params;
        const { userid } = req.body;
        repository.filterAcction(acction,userid).then((planDailyMeeting) =>{
            res.json({
                result: 'ok',
                data: planDailyMeeting,
                lengh: planDailyMeeting.lengh,
                message:'search plan Daily Meeting successfully'
            })
        }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'search plan Daily Meeting failed' + error
        }));
    }
}