import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({

    headline: {
        type: String,
    },
    slug: {
        type: String,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    source: {
        type: String,
    }


}, {timestamps: true});

const News = mongoose.models.News || mongoose.model("News", newsSchema, "newses");

export default News