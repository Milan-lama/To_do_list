const mongoose = require('mongoose')
const todolistSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,"Please add the title of the task"]
    },
    duedate:{
        type:Date,
        require:[true,"Please add the due data of the task"]
    },
},
{
    timestamps:true
})

module.exports = mongoose.model("Todolist",todolistSchema)