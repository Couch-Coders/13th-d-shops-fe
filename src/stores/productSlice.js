import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorService from "../service/errorService";
import {
  postProduct,
  imageDate,
  onGetMyProduct,
} from "../service/ProductService";
const initialState = {
  product: null,
  loading: false,
  error: "",
};

export const productThunk = createAsyncThunk(
  "product/getproduct",
  async (_, thunkApi) => {
    try {
      return await onGetMyProduct();
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const productUpdateThunk = createAsyncThunk(
  "product/Updateproduct",
  async (updateproduct, thunkApi) => {
    try {
      return await postProduct(updateproduct);
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const imageUpdateThunk = createAsyncThunk(
  "product/Updateimage",
  async (imagedate, thunkApi) => {
    const { file, seq } = imagedate;
    try {
      return await imageDate(file, seq);
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers(builder) {
    builder.addCase(productThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productThunk.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(productThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "";
    });
    builder.addCase(productUpdateThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productUpdateThunk.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(imageUpdateThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "";
    });
    builder.addCase(imageUpdateThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(imageUpdateThunk.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(productUpdateThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "";
    });
  },
});
export default productSlice.reducer;
