const { mongoose } = require("../DB/mongoose");

const FieldSchema = new mongoose.Schema({
  fieldType: {
    type: Number,
    required: () => {
      return this.type ? true : false;
    },
  },
  fieldName: String,
});

const optionSechma = new mongoose.Schema({
  // 0 for text, 1 for single selection, 2 for multi-selection
  optionContent: {
    type: String,
    required: () => {
      return this.optionContent ? false : true;
    },
  },

  optionSelectedCount: { type: Number, default: 0 },
});

const surveyQuestionSchema = new mongoose.Schema({
  // 0 for text, 1 for single selection, 2 for multi-selection
  questionType: {
    type: Number,
    default: 0,
  },

  questionTitle: {
    type: String,
  },

  questionOptions: {
    type: [optionSechma],
    required: () => {
      return this.questionType !== 0;
    },
  },
});

const responseSchema = new mongoose.Schema({
  userID: String,
  content: String,
  Date: Date,
});

const surveySchema = new mongoose.Schema({
  submittedUsers: { type: [String], default: [] },
  surveyQuestions: [surveyQuestionSchema],
  textResponse: { type: [responseSchema], default: [] },
});

const commentSchema = new mongoose.Schema({
  content: String,
  userID: String,
  date: Date,
});

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  text_content: String,
  imgPath: [String],
  registerFields: [FieldSchema],
  registeredUser: [String],
  survey: surveySchema,
  comments: { type: [commentSchema], default: [] },
  // If the field is 0, this announcement is not visible to public, else 1.
  visible: Number,
});

const Announcements = mongoose.model("Announcements", AnnouncementSchema);

module.exports = { Announcements };
