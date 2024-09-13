import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getAllCoupon = createAsyncThunk(
  "coupon/get-coupons",
  async (_, thunkAPI) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/create-coupon",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupons(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteACoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getACoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateACoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (coupon, thunkAPI) => {
    try {
      return await couponService.updateCoupon(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  coupons: [],
  coupon: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || action.error.message;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || action.error.message;
      })
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || action.error.message;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const coupon = action.payload;
        if (coupon) {
          state.coupon = coupon;
        }
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || action.error.message;
      })
      .addCase(updateACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const coupon = action.payload;
        if (coupon) {
          state.coupon = coupon;
        }
      })
      .addCase(updateACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
