import {
  OrderCreateType,
  OrderReadType,
  OrderUpdateStatusType,
} from "../../../misc/orderType";
import newAxiosConfig from "../../utils/newAxiosConfig";

// Get All Orders (Admin only)
const getAllOrders = async (): Promise<OrderReadType[]> => {
  try {
    const response = await newAxiosConfig.get("orders");
    return response.data;
  } catch (error) {
    console.error("Error getting all orders:", error);
    throw error;
  }
};

// Get Orders By User Id
const getOrdersByUserId = async (userId: string): Promise<OrderReadType[]> => {
  try {
    const response = await newAxiosConfig.get(`orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting orders for user ${userId}:`, error);
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<OrderReadType> => {
  try {
    const response = await newAxiosConfig.get(`orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting order ${orderId}:`, error);
    throw error;
  }
};

// Create Order
export const createOrder = async (
  orderData: OrderCreateType
): Promise<OrderReadType> => {
  try {
    const response = await newAxiosConfig.post("orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Update Order Status
export const updateOrderStatus = async (
  orderId: string,
  orderData: OrderUpdateStatusType
): Promise<OrderReadType> => {
  try {
    const response = await newAxiosConfig.patch(`orders/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order status for ${orderId}:`, error);
    throw error;
  }
};

export const deleteOrder = async (orderId: string): Promise<boolean> => {
  try {
    await newAxiosConfig.delete(`orders/${orderId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting order ${orderId}:`, error);
    throw error;
  }
};

const cartService = {
  getAllOrders,
  getOrdersByUserId,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};

export default cartService;
