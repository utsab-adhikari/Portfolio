import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    category: {
        type: String,
    },
    date: {
        type: Date,
    },
    time: {
        type: String,
    },
    description: {
        type: String,
    },
    isDone: {
        type: Boolean,
        default: false,
    }

}, {timestamps: true});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema, "tasks");

export default Task;