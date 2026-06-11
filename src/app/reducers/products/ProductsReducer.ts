import { createSlice } from '@reduxjs/toolkit';
import { ProductsApi } from './ProductsApi';
import type { IProduct } from './ProductsApi';

interface IProductsState {
  items: IProduct[];
  total: number;
  isLoading: boolean;
}

const initialState: IProductsState = {
  items: [],
  total: 0,
  isLoading: false,
};

const ProductsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(ProductsApi.endpoints.getProducts.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        ProductsApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.items = action.payload.products;
          state.total = action.payload.total;
          state.isLoading = false;
        },
      )
      .addMatcher(ProductsApi.endpoints.getProducts.matchRejected, (state) => {
        state.isLoading = false;
      });
  },
});

export type { IProduct };
export default ProductsSlice.reducer;
