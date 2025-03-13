import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        Unique: true
    },
    answer: {
        type: String,
        required: true
    },
    languageCode: {
        type: String,
        required: true
    },
    translation: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Translation"
    }]
})

const faq= new mongoose.model("FAQ",faqSchema);
export default faq;