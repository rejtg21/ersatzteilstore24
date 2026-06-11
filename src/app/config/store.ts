import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@reducers/products/ProductsReducer';
import { ProductsApi } from '@reducers/products/ProductsApi';

const store = configureStore({
  reducer: {
    Products: productsReducer,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsApi.middleware),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
