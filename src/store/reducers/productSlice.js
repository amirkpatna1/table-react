import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialProductState = {
  products: [],
  page: 1,
  limit: 15,
  category: null,
  hasMore: true,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    setInitialProductState: (state) => {
      state.products = [];
      state.page = 1;
      state.limit = 15;
      state.hasMore = true;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductData: (state, action) => {
      if (state.page === 1) {
        state.products = action.payload;
      } else {
        state.products = [...state.products, ...action.payload];
      }
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
const updateProductList = (data, dispatch, getState) => {
  const state = getState();
  const currProducts = [...state.products.products];
  let found = false;
  for(let i = 0; i < currProducts.length; i += 1) {
    if(currProducts[i].id == data.id) {
      currProducts[i] = data;
      found = true;
      break;
    }
  }
  if(!found) {
    currProducts.unshift(data);
  }
  dispatch(setProductData(currProducts));
}

export const fetchProductsData = createAsyncThunk(
  "products/fetchProductsData",
  async (params, { dispatch }) => {
    const { page, limit, skip } = params;

    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
      );

      if (response && response.data && Array.isArray(response.data.products)) {
        dispatch(setProductData(response.data.products));
        dispatch(setHasMore(response.data.products.length === limit));
      } else {
        dispatch(setProductData([]));
        dispatch(setHasMore(false));
        dispatch(setError("No products found or unexpected response format."));
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      dispatch(setError("An error occurred while fetching products."));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addNewProductsData = createAsyncThunk(
  "products/add",
  async (data, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `https://dummyjson.com/products/add`, JSON.stringify(data)
      );
      if (response && response.data) {
        updateProductList(data, dispatch, getState);
      } else {
      }
    } catch (err) {
      console.error("Error adding product:", err);
      dispatch(setError("An error occurred while adding product."));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateProductsData = createAsyncThunk(
  "products/update",
  async (data, { dispatch, getState }) => {
    try {
      console.log(data);
      const response = await axios.put(
        `https://dummyjson.com/products/${data.id}`, JSON.stringify(data)
      );

      if (response && response.data) {
        updateProductList(data, dispatch, getState);
        // dispatch(fetchProductsData());
      } else {
      }
    } catch (err) {
      console.error("Error updating product:", err);
      dispatch(setError("An error occurred while updating product."));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "categoryProduct/fetchCategoryProducts",
  async (category, { dispatch }) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );

      dispatch(setProductData(response.data.products));
      dispatch(setHasMore(false));

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const {
  setLoading,
  setHasMore,
  setLimit,
  setPage,
  setProductData,
  setError,
  setCategory,
  setInitialProductState,
} = productsSlice.actions;
export default productsSlice.reducer;
