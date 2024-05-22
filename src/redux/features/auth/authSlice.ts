import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UserCredential,
  UserDetailsType,
  RegisterType,
} from "../../../misc/authType";
import authService from "./authService";
import { STATUS } from "../../../constants/Status";
import axios from "axios";
import { UserRole } from "../../../misc/enum";

export interface AuthState {
  user: UserDetailsType | null;
  token: string;
  userRole: UserRole | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

export const initialState: AuthState = {
  user: null,
  token: "",
  userRole: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterType, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          message: error.message,
          status: error.response?.status,
        });
      }
      return thunkAPI.rejectWithValue({
        message: "An error occurred",
        status: 500,
      });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserCredential, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          message: error.message,
          status: error.response?.status,
        });
      }
      return thunkAPI.rejectWithValue({
        message: "An error occurred",
        status: 500,
      });
    }
  }
);

export const getAuthProfile = createAsyncThunk(
  "auth/getAuthProfile",
  async (_, thunkAPI) => {
    try {
      return await authService.getAuthProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<UserDetailsType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Error";
      state.status = STATUS.ERROR;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ token: string; userRole: UserRole }>) => {
        localStorage.setItem("loginToken", action.payload.token);
        localStorage.setItem("userRole", action.payload.userRole);
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.userRole = action.payload.userRole;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Error";
      state.status = STATUS.ERROR;
    });

    builder.addCase(getAuthProfile.pending, (state) => {
      state.isLoading = true;
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      getAuthProfile.fulfilled,
      (state, action: PayloadAction<UserDetailsType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(getAuthProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Error";
      state.user = null;
      state.status = STATUS.ERROR;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
      state.token = "";
      state.status = STATUS.SUCCESS;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Error";
      state.status = STATUS.ERROR;
    });
  },
});

const authReducer = authSlice.reducer;

export const { authReset } = authSlice.actions;

export default authReducer;
