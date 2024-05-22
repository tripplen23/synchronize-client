import {
  OrderCreateType,
  OrderReadType,
  OrderUpdateStatusType,
} from "../../../misc/orderType";
import orderService from "./orderService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";

interface OrderState {
  orders: OrderReadType[];
  order: OrderReadType | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};

// get all orders
export const getAllOrders = createAsyncThunk<OrderReadType[], void>(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllOrders();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Get Order By Id
export const getOrderById = createAsyncThunk<OrderReadType, string>(
  "orders/getOrderById",
  async (orderId: string, thunkAPI) => {
    try {
      return await orderService.getOrderById(orderId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Create Order
export const createOrder = createAsyncThunk<OrderReadType, OrderCreateType>(
  "orders/createOrder",
  async (orderData: OrderCreateType, thunkAPI) => {
    try {
      return await orderService.createOrder(orderData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Update Order Status
export const updateOrderStatus = createAsyncThunk<
  OrderReadType,
  { orderId: string; orderData: OrderUpdateStatusType }
>("orders/updateOrderStatus", async ({ orderId, orderData }, thunkAPI) => {
  try {
    return await orderService.updateOrderStatus(orderId, orderData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

// Delete an order
export const deleteOrder = createAsyncThunk<boolean, string>(
  "orders/deleteOrder",
  async (orderId: string, thunkAPI) => {
    try {
      return await orderService.deleteOrder(orderId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// getOrdersByUserId
export const getOrdersByUserId = createAsyncThunk<OrderReadType[], string>(
  "orders/getOrdersByUserId",
  async (userId: string, thunkAPI) => {
    try {
      return await orderService.getOrdersByUserId(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get All Orders
      .addCase(getAllOrders.pending, (state: OrderState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        getAllOrders.fulfilled,
        (state: OrderState, action: PayloadAction<OrderReadType[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.orders = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(getAllOrders.rejected, (state: OrderState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Error";
        state.status = STATUS.ERROR;
      })

      // Get Order By Id
      .addCase(getOrderById.pending, (state: OrderState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        getOrderById.fulfilled,
        (state: OrderState, action: PayloadAction<OrderReadType>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.order = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(getOrderById.rejected, (state: OrderState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      });

    // Create Order
    builder
      .addCase(createOrder.pending, (state: OrderState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        createOrder.fulfilled,
        (state: OrderState, action: PayloadAction<OrderReadType>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.order = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(createOrder.rejected, (state: OrderState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      });

    // Update Order Status
    builder
      .addCase(updateOrderStatus.pending, (state: OrderState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state: OrderState, action: PayloadAction<OrderReadType>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.order = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(updateOrderStatus.rejected, (state: OrderState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      });

    // Delete Order
    builder
      .addCase(deleteOrder.pending, (state: OrderState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(deleteOrder.fulfilled, (state: OrderState) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.status = STATUS.SUCCESS;
      })
      .addCase(deleteOrder.rejected, (state: OrderState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      });

    // getOrdersByUserId
    builder
      .addCase(getOrdersByUserId.pending, (state: OrderState) => {
        state.isLoading = true;
        state.error = STATUS.LOADING;
      })
      .addCase(
        getOrdersByUserId.fulfilled,
        (state: OrderState, action: PayloadAction<OrderReadType[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.orders = action.payload;
          state.status = STATUS.SUCCESS;
        }
      )
      .addCase(getOrdersByUserId.rejected, (state: OrderState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "error";
        state.status = STATUS.ERROR;
      });
  },
});

const orderReducer = orderSlice.reducer;
export const { resetOrder } = orderSlice.actions;
export default orderReducer;
