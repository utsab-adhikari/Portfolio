import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true
    },
    topic: {
        type: String,
    },
    partno: {
        type: Number,
        default: 1,
    },

}, {timestamps: true});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema, "blogs");

export default Blog;