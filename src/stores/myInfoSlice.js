import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorService from "../service/errorService";
import { onGetMyInfo } from "../service/authservice";

const initialState = {
  myInfo: null,
  loading: false,
  error: "",
};

export const myInfoThunk = createAsyncThunk(
  "myInfo/getMyInfo",
  async (_, thunkApi) => {
    try {
      return await onGetMyInfo();
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  extraReducers(builder) {
    builder.addCase(myInfoThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(myInfoThunk.fulfilled, (state, action) => {
      state.myInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(myInfoThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "";
    });
  },
});
export default myInfoSlice.reducer;
