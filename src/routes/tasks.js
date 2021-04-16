const express = require('express');
const router = express.Router();

const Task    = require('../models/task');


router.get('/', async (req,res) =>{
    const tasks =  await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req,res)=>{
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async (req,res)=>{
    const newTask = new Task({
        title: req.body.title, 
        description: req.body.description
    });
    await newTask.save();
    res.json({
        message: 'Task is a saved correctly'
    });
});

router.put('/:id', async (req,res)=>{
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        message: 'Task Update correctly'
    });
});

router.delete('/:id', async(req,res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        message: 'Task Deleted correctly'
    });
});

module.exports = router;