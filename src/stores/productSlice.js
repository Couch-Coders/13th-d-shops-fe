import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorService from "../service/errorService";
import { postProduct } from "../service/productService";

const initialState = {
  product: null,
  loading: false,
  error: "",
};

export const productUpdateThunk = createAsyncThunk(
  "product/UpdateProduct",
  async (updateproduct, thunkApi) => {
    try {
      return await postProduct(updateproduct);
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
    builder.addCase(productUpdateThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productUpdateThunk.fulfilled, (state, action) => {
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
