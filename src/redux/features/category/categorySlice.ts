import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryReadType,
  CategoryCreateType,
  CategoryUpdateType,
} from "../../../misc/categoryType";
import categoryService from "./categoryService";
import { STATUS } from "../../../constants/Status";
import { UUID } from "crypto";

interface CategoryState {
  categories: CategoryReadType[];
  category: CategoryReadType | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};

export const getAllCategories = createAsyncThunk<CategoryReadType[], void>(
  "category/getAllCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getAllCategories();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const getCategoryById = createAsyncThunk<CategoryReadType, UUID>(
  "category/getCategoryById",
  async (categoryId: UUID, thunkAPI) => {
    try {
      return await categoryService.getCategoryById(categoryId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const createCategory = createAsyncThunk<
  CategoryReadType,
  CategoryCreateType
>(
  "category/createCategory",
  async (categoryData: CategoryCreateType, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const updateCategory = createAsyncThunk<
  CategoryReadType,
  { categoryId: UUID; categoryData: CategoryUpdateType }
>("category/updateCategory", async ({ categoryId, categoryData }, thunkAPI) => {
  try {
    return await categoryService.updateCategory(categoryId, categoryData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

export const deleteCategory = createAsyncThunk<boolean, UUID>(
  "category/deleteCategory",
  async (categoryId: UUID, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(categoryId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategory: (state) => initialState,
  },
  extraReducers: (builder) => {
    // getAllCategories
    builder.addCase(getAllCategories.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      getAllCategories.fulfilled,
      (state: CategoryState, action: PayloadAction<CategoryReadType[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(
      getAllCategories.rejected,
      (state: CategoryState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      }
    );

    // getCategoryById
    builder.addCase(getCategoryById.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      getCategoryById.fulfilled,
      (state: CategoryState, action: PayloadAction<CategoryReadType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(
      getCategoryById.rejected,
      (state: CategoryState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      }
    );

    // createCategory
    builder.addCase(createCategory.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      createCategory.fulfilled,
      (state: CategoryState, action: PayloadAction<CategoryReadType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(createCategory.rejected, (state: CategoryState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });

    // updateCategory
    builder.addCase(updateCategory.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      updateCategory.fulfilled,
      (state: CategoryState, action: PayloadAction<CategoryReadType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.map((category) =>
          category.categoryId === action.payload.categoryId
            ? action.payload
            : category
        );
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(updateCategory.rejected, (state: CategoryState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });

    // deleteCategory
    builder.addCase(deleteCategory.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      deleteCategory.fulfilled,
      (
        state: CategoryState,
        action: PayloadAction<boolean, string, { arg: string }>
      ) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(
          (category) => category.categoryId !== action.meta.arg
        );
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(deleteCategory.rejected, (state: CategoryState, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "error";
      state.status = STATUS.ERROR;
    });
  },
});

const categoryReducer = categorySlice.reducer;

export const { resetCategory } = categorySlice.actions;

export default categoryReducer;
