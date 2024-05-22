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
export const getProductById = createAsyncThunk<ProductReadType, string>(
  "product/getProductById",
  async (productId: string, thunkAPI) => {
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
export const getProductsByCategory = createAsyncThunk<
  ProductReadType[],
  string
>("product/getProductsByCategory", async (categoryId: string, thunkAPI) => {
  try {
    return await productService.getProductsByCategory(categoryId);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

// Delete Product
export const deleteProduct = createAsyncThunk<boolean, string>(
  "product/deleteProduct",
  async (productId: string, thunkAPI) => {
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
  { productId: string; productData: ProductUpdateType }
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => initialState,
  },
  extraReducers: (builder) => {
    // getAllProducts
    builder.addCase(getProducts.pending, (state: ProductState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state: ProductState, action: PayloadAction<ProductReadType[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(getProducts.rejected, (state: ProductState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });

    // getProductById
    builder.addCase(getProductById.pending, (state: ProductState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      getProductById.fulfilled,
      (state: ProductState, action: PayloadAction<ProductReadType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(getProductById.rejected, (state: ProductState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });

    // getProductsByCategory
    builder.addCase(getProductsByCategory.pending, (state: ProductState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      getProductsByCategory.fulfilled,
      (state: ProductState, action: PayloadAction<ProductReadType[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(
      getProductsByCategory.rejected,
      (state: ProductState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      }
    );

    // deleteProduct
    builder.addCase(deleteProduct.pending, (state: ProductState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(deleteProduct.fulfilled, (state: ProductState) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.status = STATUS.SUCCESS;
    });
    builder.addCase(deleteProduct.rejected, (state: ProductState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });

    // addNewProduct
    builder.addCase(addNewProduct.pending, (state: ProductState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      addNewProduct.fulfilled,
      (state: ProductState, action: PayloadAction<ProductReadType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(addNewProduct.rejected, (state: ProductState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });

    // updateProduct
    builder.addCase(updateProduct.pending, (state: ProductState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      updateProduct.fulfilled,
      (state: ProductState, action: PayloadAction<ProductReadType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(updateProduct.rejected, (state: ProductState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });

    // sortProductsByPrice
    builder.addCase(sortProductsByPrice.pending, (state: ProductState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      sortProductsByPrice.fulfilled,
      (state: ProductState, action: PayloadAction<ProductReadType[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(
      sortProductsByPrice.rejected,
      (state: ProductState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      }
    );
  },
});

const productReducer = productSlice.reducer;

export const { resetProduct } = productSlice.actions;

export default productReducer;
