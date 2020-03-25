const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
    fieldType: {
        type:Number,
        required: ()=>{
            return this.type? true: false
        }
    },
    fieldName: String
});

const optionSechma = new mongoose.Schema({
    // 0 for text, 1 for single selection, 2 for multi-selection
    optionContent:{
        type: Text,
        required:()=>{
            return this.optionContent? false:true
        }
    },
    
    optionSelectedCount: {type:Number, default: 0}
})

const surveyQuestionSchema = new mongoose.Schema({
    // 0 for text, 1 for single selection, 2 for multi-selection
    qusetionType: {
        type:Number,
        default: 0
    },
    
    questionOptions:{
        type: [optionSechma],
        required: ()=>{
            return this.surveyQuestions.length != 0
        }
    }
})

const responseSchema = new mongoose.Schema({
    userID: Number,
    content: Text,
    Date: Date
})

const surveySchema = new mongoose.Schema({
    submittedUsers:[Number],
    surveyQuestions:[surveyQuestionSchema],
    textResponse: [responseSchema]
    
})

const commentSchema = new  mongoose.Schema({
    content: String,
    userID: Number,
    date: Date
})

const AnnouncementSchema = new mongoose.Schema({
    text_content: Text,
    imgPath: String,
    registerFields: [FieldSchema],
    registeredUser: [Number],
    survey: surveySchema,
    comments: [commentSchema]
});



const Announcement = mongoose.model('Restaurant', AnnouncementSchema);

module.exports = { Announcement };