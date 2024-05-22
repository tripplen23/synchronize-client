import {
  UserCreateType,
  UserReadType,
  UserUpdateType,
} from "../../../misc/userType";
import userService from "./userService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";

interface UserState {
  users: UserReadType[];
  user: UserReadType | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

const initialState: UserState = {
  users: [],
  user: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};

// Get All Users
export const getAllUsers = createAsyncThunk<UserReadType[], void>(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      return await userService.getAllUsers();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Get User By Id
export const getUserById = createAsyncThunk<UserReadType, string>(
  "users/getUserById",
  async (userId: string, thunkAPI) => {
    try {
      return await userService.getUserById(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Create User
export const createUser = createAsyncThunk<UserReadType, UserCreateType>(
  "users/createUser",
  async (userData: UserCreateType, thunkAPI) => {
    try {
      return await userService.createUser(userData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Update User
export const updateUser = createAsyncThunk<
  UserReadType,
  { userId: string; userData: UserUpdateType }
>("users/updateUser", async ({ userId, userData }, thunkAPI) => {
  try {
    return await userService.updateUser(userId, userData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

// Delete User
export const deleteUser = createAsyncThunk<boolean, string>(
  "users/deleteUser",
  async (userId: string, thunkAPI) => {
    try {
      return await userService.deleteUser(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state: UserState, action: PayloadAction<UserReadType[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.users = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(getAllUsers.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Error";
        state.status = STATUS.ERROR;
      })

      // Get User By Id
      .addCase(getUserById.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        getUserById.fulfilled,
        (state: UserState, action: PayloadAction<UserReadType>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(getUserById.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Error";
        state.status = STATUS.ERROR;
      })

      // Create User
      .addCase(createUser.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        createUser.fulfilled,
        (state: UserState, action: PayloadAction<UserReadType>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(createUser.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Error";
        state.status = STATUS.ERROR;
      })

      // Update User
      .addCase(updateUser.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        updateUser.fulfilled,
        (state: UserState, action: PayloadAction<UserReadType>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(updateUser.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Error";
        state.status = STATUS.ERROR;
      })

      // Delete User
      .addCase(deleteUser.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(deleteUser.fulfilled, (state: UserState) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.status = STATUS.SUCCESS;
      })
      .addCase(deleteUser.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Error";
        state.status = STATUS.ERROR;
      });
  },
});

const userReducer = userSlice.reducer;
export const { resetUser } = userSlice.actions;
export default userReducer;
