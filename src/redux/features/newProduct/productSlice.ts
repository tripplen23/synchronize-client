import { randomUUID, UUID } from "crypto";
import {
  ProductCreateType,
  ProductReadType,
  ProductUpdateType,
} from "../../../misc/newProductType";
import productService from "./productService";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";

interface ProductState {
  products: ProductReadType[];
  product: ProductReadType | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};

// Get All Products
export const getProducts = createAsyncThunk<ProductReadType[], void>(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Get Product By Id
export const getProductById = createAsyncThunk<ProductReadType, UUID>(
  "product/getProductById",
  async (productId: UUID, thunkAPI) => {
    try {
      return await productService.getProductById(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Get Products By Category
export const getProductsByCategory = createAsyncThunk<ProductReadType[], UUID>(
  "product/getProductsByCategory",
  async (categoryId: UUID, thunkAPI) => {
    try {
      return await productService.getProductsByCategory(categoryId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk<boolean, UUID>(
  "product/deleteProduct",
  async (productId: UUID, thunkAPI) => {
    try {
      return await productService.deleteProduct(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Add New Product
export const addNewProduct = createAsyncThunk<
  ProductReadType,
  ProductCreateType
>("product/addNewProduct", async (productData: ProductCreateType, thunkAPI) => {
  try {
    return await productService.addNewProduct(productData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

// Update Product
export const updateProduct = createAsyncThunk<
  ProductReadType,
  { productId: UUID; productData: ProductUpdateType }
>("product/updateProduct", async ({ productId, productData }, thunkAPI) => {
  try {
    return await productService.updateProduct(productId, productData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

// Sort Products By Price
export const sortProductsByPrice = createAsyncThunk(
  "products/sortByPrice",
  async (sortOrder: "asc" | "desc", thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { product: ProductState };
      const { products } = state.product;

      let sortedProducts: ProductReadType[] = [];

      if (sortOrder === "asc") {
        sortedProducts = products
          .slice()
          .sort(
            (a: ProductReadType, b: ProductReadType) =>
              a.productPrice - b.productPrice
          ); // Sort low to high
      } else if (sortOrder === "desc") {
        sortedProducts = products
          .slice()
          .sort(
            (a: ProductReadType, b: ProductReadType) =>
              b.productPrice - a.productPrice
          ); // Sort high to low
      }
      return sortedProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);