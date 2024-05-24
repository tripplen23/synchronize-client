import {
  CartCreateType,
  CartItemCreateType,
  CartReadType,
  CartUpdateType,
} from "../../../misc/cartType";
import newAxiosConfig from "../../utils/newAxiosConfig";

// Fetch cart items
const fetchCartItems = async (cartId: string): Promise<CartReadType> => {
  const response = await newAxiosConfig.get(`/carts/${cartId}`);
  return response.data;
};

// Get cart by user Id
const getCartByUserId = async (userId: string): Promise<CartReadType> => {
  const response = await newAxiosConfig.get(`/carts/user/${userId}`);
  return response.data;
};

// Add item to cart
const addToCart = async (
  cartItem: CartItemCreateType
): Promise<CartReadType> => {
  const createOrUpdateCartDto: CartCreateType = {
    cartItems: [cartItem],
  };
  const response = await newAxiosConfig.post(`/carts`, createOrUpdateCartDto);
  return response.data;
};

// Delete item from cart
const deleteItemFromCart = async (
  cartId: string,
  productId: string
): Promise<CartReadType> => {
  const updateCartDto: CartUpdateType = {
    cartId,
    cartItems: [{ productId, quantity: 0 }],
  };
  const response = await newAxiosConfig.patch(
    `/carts/${cartId}`,
    updateCartDto
  );
  return response.data;
};

// Decrease quantity of an item
const decreaseQuantity = async (
  cartId: string,
  productId: string
): Promise<CartReadType> => {
  const response = await newAxiosConfig.get(`/carts/${cartId}`);
  const cart: CartReadType = response.data;
  const cartItem = cart.cartItems.find((item) => item.product.id === productId);
  if (!cartItem) throw new Error("Item not found in cart");

  const updateCartDto: CartUpdateType = {
    cartId,
    cartItems: [{ productId, quantity: cartItem.quantity - 1 }],
  };
  const updatedCartResponse = await newAxiosConfig.patch(
    `/carts/${cartId}`,
    updateCartDto
  );
  return updatedCartResponse.data;
};

// Increase quantity of an item
const increaseQuantity = async (
  cartId: string,
  productId: string
): Promise<CartReadType> => {
  const response = await newAxiosConfig.get(`/carts/${cartId}`);
  const cart: CartReadType = response.data;
  const cartItem = cart.cartItems.find((item) => item.product.id === productId);
  if (!cartItem) throw new Error("Item not found in cart");

  const updateCartDto: CartUpdateType = {
    cartId,
    cartItems: [{ productId, quantity: cartItem.quantity + 1 }],
  };
  const updatedCartResponse = await newAxiosConfig.patch(
    `/carts/${cartId}`,
    updateCartDto
  );
  return updatedCartResponse.data;
};

// Delete A Cart
const deleteCart = async (cartId: string): Promise<boolean> => {
  try {
    await newAxiosConfig.delete(`/carts/${cartId}`);
    return true;
  } catch (error) {
    console.error("Error deleting cart", error);
    return false;
  }
};

const cartService = {
  fetchCartItems,
  getCartByUserId,
  addToCart,
  deleteItemFromCart,
  decreaseQuantity,
  increaseQuantity,
  deleteCart,
};

export default cartService;
