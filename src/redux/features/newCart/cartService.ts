import { CartCreateType, CartItemCreateType, CartReadType } from "../../../misc/newCartType";
import newAxiosConfig from "../../utils/newAxiosConfig";

const fetchCartItems = async (cartId: string): Promise<CartReadType> => {
  try {
    const response = await newAxiosConfig.get<CartReadType>(`carts/${cartId}`);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

const addToCart = async (cartItem: CartItemCreateType) => {
  try {
    const response = await newAxiosConfig.post<CartCreateType>(
      "carts",
      cartItem
    );
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

const deleteItemFromCart = async (cartId: string) => {

};

const decreaseQuantity = async (cartId: string) => {};

const increaseQuantity = async (cartId: string) => {};

const cartService = {
  fetchCartItems,
  addToCart,
  deleteItemFromCart,
  decreaseQuantity,
  increaseQuantity,
};

export default cartService;
