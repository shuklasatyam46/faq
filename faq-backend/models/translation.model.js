import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
    faqID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FAQ"
    },
    languageCode: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

const translation = new mongoose.model("Translation", translationSchema);
export default translation;