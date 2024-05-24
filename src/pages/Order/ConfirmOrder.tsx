import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import { createOrder } from "../../redux/features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import { OrderCreateType } from "../../misc/orderType";
import { deleteCart } from "../../redux/features/cart/cartSlice";

const ConfirmOrder: React.FC = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo") || "{}");

  const totalPrice = cart?.cartItems.reduce(
    (total, item) => total + item.quantity * item.product.productPrice,
    0
  );

  const handleConfirmOrder = () => {
    // Reference the cartItems data to orderProduct data
    const orderData: OrderCreateType = {
      orderProducts:
        cart?.cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })) || [],
      shippingInfo,
    };

    dispatch(createOrder(orderData)).then((result) => {
      if (createOrder.fulfilled.match(result)) {
        dispatch(deleteCart(cart!.id));
        navigate("/order/success");
      } else {
        alert("Failed to place order. Please try again.");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Confirm Order</h2>
      <div className="bg-primary rounded-lg shadow-md p-4 mb-8 dark:bg-gray-500">
        <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
        <p>Address: {shippingInfo.shippingAddress}</p>
        <p>City: {shippingInfo.shippingCity}</p>
        <p>Country: {shippingInfo.shippingCountry}</p>
        <p>Postcode: {shippingInfo.shippingPostCode}</p>
        <p>Phone Number: {shippingInfo.shippingPhone}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-8 dark:bg-dark">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {cart?.cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between mb-2">
            <span>
              {item.product.productTitle} x {item.quantity}
            </span>
            <span>
              ${(item.quantity * item.product.productPrice).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>${totalPrice?.toFixed(2)}</span>
        </div>
      </div>
      <ButtonComponent
        onClick={handleConfirmOrder}
        className="hover:bg-primary text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        Confirm Order
      </ButtonComponent>
    </div>
  );
};

export default ConfirmOrder;
