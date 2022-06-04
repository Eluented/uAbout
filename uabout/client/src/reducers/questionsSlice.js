import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { getQuestions } from "../actions";

export const fetchQuestions = createAsyncThunk(
  "reducers/fetchQuestions",
  async (query) => {
    const {numOfQuestions, category, difficulty} = query
    const res = await getQuestions(numOfQuestions, category, difficulty);
    return res;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    answers: [],
    correctAnswer: null
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload;
    }
  },
  extraReducers: {
    [fetchQuestions.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.questions = state.questions.concat(action.payload);
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export const {
  setQuestion,
  setAnswers,
  setCorrectAnswer
} = questionsSlice.actions;

export const questions = state => state.questions.questions;
export const allAnswers = state => state.questions.answers;
export const correctAns = state => state.questions.correctAnswer;

export default questionsSlice.reducer;