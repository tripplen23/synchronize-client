import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginType, UserDetailsType } from "../../../misc/authType";
import authService from "./authService";
import { STATUS } from "../../../constants/Status";
import axios from "axios";
import { RegisterType } from "../../../misc/authType";

export interface AuthState {
  user: UserDetailsType | null;
  userId: 0;
  token: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

export const initialState: AuthState = {
  user: null,
  userId: 0,
  token: "",
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};
// Async thunk for registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterType, thunkAPI) => {
    try {
      return await authService.register({
        UserName: userData.UserName,
        UserEmail: userData.UserEmail,
        UserPassword: userData.UserPassword,
        UserAvatar: userData.UserAvatar,
        UserRole: userData.UserRole,
      });
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

// TODO: Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginType, thunkAPI) => {
    try {
      return await authService.login({
        email: String(user.email),
        password: String(user.password),
      });
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

// TODO: Async thunk for Get user
export const getUser = createAsyncThunk(
  "auth/user",
  async (userId: number, thunkAPI) => {
    try {
      return await authService.getUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Async thunk for Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
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
    // TODO: Reducer's cases for registration
    builder.addCase(register.pending, (state: AuthState) => {
      return {
        ...state,
        isLoading: true,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      register.fulfilled,
      (state: AuthState, action: PayloadAction<string>) => {
        console.log("Register Action Payload: ", action.payload);
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          data: action.payload,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(register.rejected, (state: AuthState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for login
    builder.addCase(login.pending, (state: AuthState) => {
      return {
        ...state,
        isLoading: true,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      login.fulfilled,
      (state: AuthState, action: PayloadAction<string>) => {
        localStorage.setItem("loginToken", JSON.stringify(action.payload));
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          token: action.payload,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(login.rejected, (state: AuthState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for getUser
    builder.addCase(getUser.pending, (state: AuthState) => {
      return {
        ...state,
        isLoading: true,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      getUser.fulfilled,
      (state: AuthState, action: PayloadAction<UserDetailsType>) => {
        localStorage.setItem("userDetails", JSON.stringify(action.payload));
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          user: action.payload,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(getUser.rejected, (state: AuthState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        user: null,
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for logout
    builder.addCase(logout.fulfilled, (state: AuthState) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: null,
        status: STATUS.SUCCESS,
      };
    });
    builder.addCase(logout.rejected, (state: AuthState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });
  },
});

const authReducer = authSlice.reducer;

export const { authReset } = authSlice.actions;

export default authReducer;
