import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import app from '@config/app';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  thumbnail: string;
  images: string[];
}

interface IProductsParams {
  limit?: number;
  page?: number;
  keyword?: string;
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  page: number;
  limit: number;
}
/**
 * I'm using the dummyjson.com API for demonstration purposes. In a real application, you would replace the baseUrl and endpoints with your actual backend API.
 * https://dummyjson.com/docs/products
 */
export const ProductsApi = createApi({
  reducerPath: 'ProductsApi',
  baseQuery: fetchBaseQuery({ baseUrl: app.apiUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsResponse, IProductsParams | undefined>({
      query: ( { keyword = '',page = 1, limit = 10 } = {} ) => ({
        // based on the docs the search endpoint is /products/search?q=keyword but for listing products it's /products?limit=10&skip=20
        url: keyword ? '/products/search' : '/products',
        params: {
          q: keyword,
          limit: limit,
          skip: (page - 1) * limit,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = ProductsApi;
