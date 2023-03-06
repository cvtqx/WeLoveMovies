const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    const data = await theatersService.list();
    res.json({data});
}

async function read(req, res){
    const {theaterId} = req.params;
    console.log("THEATER", theaterId);
    const data = await theatersService.read(theaterId);
    res.json({data});
}


async function create(req, res){

  const theater = req.body.data;

 //const data = await theatersService.create(theater);
  res.status(201).json(await theatersService.create(theater));
}

module.exports ={
    list: asyncErrorBoundary(list),
    read,
    create
}