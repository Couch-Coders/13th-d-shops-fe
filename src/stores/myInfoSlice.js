import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorService from "../service/errorService";
import { onGetMyInfo, onUserPut1 } from "../service/authservice";
import { getProductNear } from "../service/MainPageService";

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

export const myInfoUpdateThunk = createAsyncThunk(
  "myInfo/UpdateMyInfo",
  async (updateinfo, thunkApi) => {
    try {
      return await onUserPut1(updateinfo);
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const myLocationThunk = createAsyncThunk(
  "myInfo/UpdateMyLocation",
  async (updateLocation, thunkApi) => {
    const { longitude, latitude } = updateLocation;

    try {
      return await getProductNear(longitude, latitude);
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
    builder.addCase(myInfoUpdateThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(myInfoUpdateThunk.fulfilled, (state, action) => {
      state.myInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(myInfoUpdateThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "";
    });
    builder.addCase(myLocationThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(myLocationThunk.fulfilled, (state, action) => {
      state.myInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(myLocationThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "";
    });
  },
});
export default myInfoSlice.reducer;
