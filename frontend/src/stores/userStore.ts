import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const userToken = createSlice({
  name: "userTokenReducer",
  initialState: { token: "" },
  reducers: {
    addToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    removeToken: state => {
      state.token = "";
    },
  },
});

export const { addToken, removeToken } = userToken.actions;

export default configureStore({ reducer: userToken.reducer });
