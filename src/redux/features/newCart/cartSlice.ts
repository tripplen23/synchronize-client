import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import cartService from "./cartService";
import {
  CartReadType,
  CartItemCreateType,
  CartItemReadType,
} from "../../../misc/newCartType";

interface CartState {
  cart: CartReadType | null;
  cartItems: CartItemCreateType[];
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: CartState = {
  cart: null,
  cartItems: [],
  totalItems: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Thunks for asynchronous actions
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (cartId: string, thunkAPI) => {
    try {
      return await cartService.fetchCartItems(cartId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// getCartByUserId
export const getCartByUserId = createAsyncThunk(
  "cart/getCartByUserId",
  async (userId: string, thunkAPI) => {
    try {
      return await cartService.getCartByUserId(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { userId, cartItem }: { userId: string; cartItem: CartItemCreateType },
    thunkAPI
  ) => {
    try {
      return await cartService.addToCart(cartItem);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (
    { cartId, productId }: { cartId: string; productId: string },
    thunkAPI
  ) => {
    try {
      return await cartService.deleteItemFromCart(cartId, productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (
    { cartId, productId }: { cartId: string; productId: string },
    thunkAPI
  ) => {
    try {
      return await cartService.decreaseQuantity(cartId, productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (
    { cartId, productId }: { cartId: string; productId: string },
    thunkAPI
  ) => {
    try {
      return await cartService.increaseQuantity(cartId, productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete a cart
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartId: string, thunkAPI) => {
    try {
      return await cartService.deleteCart(cartId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartReset: (state) => {
      state.cart = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setCartItems(state, action: PayloadAction<CartItemReadType[]>) {
      state.cartItems = action.payload.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      state.totalItems = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // getCartByUserId
      .addCase(getCartByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(getCartByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Delete Item From Cart
      .addCase(deleteItemFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Decrease Quantity
      .addCase(decreaseQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Increase quantity
      .addCase(increaseQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Delete cart
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { setCartItems, cartReset } = cartSlice.actions;
export default cartSlice.reducer;
