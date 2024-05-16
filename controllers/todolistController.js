const asyncHandler = require('express-async-handler')
const Todolist = require("../models/todolistModel")
//@desc get all to do list
//@route GET /api/list/
//@access private
const taskList = asyncHandler(async (req,res)=>{
    const task = await Todolist.find({user_id:req.user.id})
    res.status(200).json(task)
})

//@desc create a task
//@route POST /api/list/
//@access private
const taskCreate = asyncHandler(async (req,res)=>{
    const {title,dueDate} = req.body
    const dateObject = new Date(dueDate);
    const duedate = dateObject.toISOString();
    if(!title || !duedate){
        res.status(400)
        throw new Error("All the fields are mandatory")
    }
    const task = await Todolist.create({
        user_id:req.user.id,
        title,
        duedate
    })
    res.status(201).json(task)
})

//@desc Update task
//@route PUT /api/list
//@access private
const taskUpdate = asyncHandler(async (req,res)=>{
    const task_id = req.headers['_id'];
    const task = await Todolist.findById(task_id)
    if(!task){
        res.status(404)
        throw new Error("Did not find task")
    }
    if(task.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("User is not authorized")
    }
    const updateTask = await Todolist.findByIdAndUpdate(
        task_id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateTask)
})
//@desc Delete task
//@route DELETE /api/list
//@access private
const taskDelete = asyncHandler(async (req,res)=>{
    const task_id = req.headers['_id'];
    const task = await Todolist.findById(task_id)
    if(!task){
        res.status(404)
        throw new Error("Did not find task")
    }
    if(task.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("User is not authorized")
    }
    await Todolist.deleteOne({_id:task_id})
    res.send("list deleted")
})

module.exports = {taskList,taskCreate,taskUpdate,taskDelete}