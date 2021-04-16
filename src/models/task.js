const mongoose = require('mongoose');
const {Schema} = mongoose;

const Task = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Task',Task);