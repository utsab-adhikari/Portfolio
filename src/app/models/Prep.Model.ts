import mongoose from "mongoose"

const prepSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    category: {
        type: String,
    },
    date: {
        type: Date,
    },
    dayno: {
        type: Number,
    },
    description: {
        type: String,
    },
    isGithubCon: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
    }

}, {timestamps: true});

const Prep = mongoose.models.Prep || mongoose.model("Prep", prepSchema, "preps");

export default Prep;