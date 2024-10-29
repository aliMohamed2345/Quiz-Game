import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionProps {
    QuestionNumber: number;
    QuestionContent: string;
    Score: number | null;
    Hints?: number;
    correctAnswer: string;
    IncorrectAnswers: string[];
    Difficulty?: string,
    Topic?: string,
    IsCorrectAnswer: boolean;
    IsLoading: boolean
}

let initialState: QuestionProps = {
    QuestionNumber: 0,
    QuestionContent: "",
    Score: 0,
    Hints: 0,
    correctAnswer: "",
    IncorrectAnswers: [],
    Difficulty: "",
    Topic: "",
    IsCorrectAnswer: false,
    IsLoading: true
}


let QuestionStructureSlice = createSlice({
    name: `QuestionStructure`,
    initialState,
    reducers: {
        SetScore(state, action: PayloadAction<number>) {
            state.Score = action.payload
        },
        SetHints(state, action: PayloadAction<number>) {
            state.Hints = action.payload
        },
        SetCorrectAnswer(state, action: PayloadAction<string>) {
            state.correctAnswer = action.payload
        },
        SetQuestionNumber(state, action: PayloadAction<number>) {
            state.QuestionNumber = action.payload
        },
        SetQuestionContent(state, action: PayloadAction<string>) {
            state.QuestionContent = action.payload
        },
        SetTopic(state, action: PayloadAction<string>) {
            state.Topic = action.payload
        },
        SetDifficulty(state, action: PayloadAction<string>) {
            state.Difficulty = action.payload
        },
        SetIncorrectAnswers(state, action: PayloadAction<string[]>) {
            state.IncorrectAnswers = action.payload;
        },
        SetIsCorrectAnswer(state, action: PayloadAction<boolean>) {
            state.IsCorrectAnswer = action.payload
        },
        SetIsLoading(state, action: PayloadAction<boolean>) {
            state.IsLoading = action.payload
        }
    }
})
export default QuestionStructureSlice.reducer;
export let { SetDifficulty, SetIsLoading, SetTopic, SetQuestionContent, SetIsCorrectAnswer, SetQuestionNumber, SetScore, SetHints, SetCorrectAnswer, SetIncorrectAnswers } = QuestionStructureSlice.actions
