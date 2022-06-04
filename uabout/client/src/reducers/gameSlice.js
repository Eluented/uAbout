import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    id: null,
    status: "idle",
    player1Score: 0,
    player2Score: 0,
    roundSettings: [],
    //timer: -1
  },
  reducers: {
    updatePlayer1: (state, action) => {
      state.player1Score += action.payload;
    },
    updatePlayer2: (state, action) => {
      state.player2Score += action.payload;
    },
    updateRoundSettings: (state, action) => {
      state.roundSettings = action.payload;
    }
  },
});

export const {
  updatePlayer1,
  updatePlayer2,
  updateRoundSettings
} = gameSlice.actions;

// getting player 1 score and player 2
export const player1Sc = state => state.game.player1Score;
export const player2Sc = state => state.game.player2Score;

// getting form info
export const gameInfo = state => state.game.roundSettings;

export default gameSlice.reducer;