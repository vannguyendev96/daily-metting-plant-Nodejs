const repository = require('../repositories/PlantYearRepository');

module.exports ={
    GetAll: async (req,res,next) => {
        let { userid } = req.body;
        repository.findAll(userid).then((PlantYear) => {
            res.json({
                result: 'ok',
                data: PlantYear,
                lengh: PlantYear.lengh,
                message:'get PlantYear successfully'
            })
          }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'get PlantYear failed' + error
        }));
    },
    Create: async (req,res,next) => {
        let { name,description,endDate,completed,userid} = req.body;
        repository.create(name,description,endDate,completed,userid).then((PlantYear) => {
            res.json({
                result: 'ok',
                data: PlantYear,
                message:'Insert PlantYear successfully'
            })
            }).catch((error) => res.json({
                result: 'failed',
                data: {},
                message:'Insert PlantYear failed' + error
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
        const plantYear = { name: req.body.name,description: req.body.description,endDate: req.body.endDate,completed: req.body.completed,done: req.body.done}
        repository.updateById(id,plantYear).then((ok) =>{
            res.status(200).json([]);
        }).catch((error) => console.log(error));
    },
    GetByID: async (req,res,next) => {
        const { id } = req.params;
        repository.findById(id).then((PlantYear) => {
            res.json({
                result: 'ok',
                data: PlantYear,
                lengh: PlantYear.lengh,
                message:'get PlantYear successfully'
            })
          }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'get PlantYear failed' + error
        }));
    },
    //search
    Search: async (req,res,next) =>{
        const { keyword,userid } = req.body;
        repository.search(keyword,userid).then((PlantYear) =>{
            res.json({
                result: 'ok',
                data: PlantYear,
                lengh: PlantYear.lengh,
                message:'search PlantYear successfully'
            })
        }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'search PlantYear failed' + error
        }));
    },
    //filter
    FilterAcction: async (req,res,next) =>{
        const { acction } = req.params;
        const { userid } = req.body;
        repository.filterAcction(acction,userid).then((PlantYear) =>{
            res.json({
                result: 'ok',
                data: PlantYear,
                lengh: PlantYear.lengh,
                message:'search PlantYear successfully'
            })
        }).catch((error) => res.json({
            result: 'failed',
            data: {},
            message:'search PlantYear failed' + error
        }));
    }
}
