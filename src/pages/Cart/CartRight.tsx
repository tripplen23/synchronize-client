import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { ShippingInfoCreateType } from "../../misc/orderType";

const CartRight: React.FC = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { register, handleSubmit } = useForm<ShippingInfoCreateType>();
  const navigate = useNavigate();

  const totalPrice = cart?.cartItems.reduce(
    (total, item) => total + item.quantity * item.product.productPrice,
    0
  );

  const onSubmit: SubmitHandler<ShippingInfoCreateType> = (data) => {
    // Store the shipping info in local storage or global state
    // Navigate to the order confirmation page
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    navigate("/order/confirm");
  };

  return (
    <div className="flex justify-end">
      <div className="cartRight mt-16">
        <div className="bg-light border rounded-lg p-6 shadow-lg mb-5">
          <h2 className="text-lg font-semibold mb-4 dark:text-dark">
            Shipping Information
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <input
              {...register("shippingAddress", { required: true })}
              placeholder="Address"
              className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              {...register("shippingCity", { required: true })}
              placeholder="City"
              className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              {...register("shippingCountry", { required: true })}
              placeholder="Country"
              className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              {...register("shippingPostCode", { required: true })}
              placeholder="Post Code"
              className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              {...register("shippingPhone", { required: true })}
              placeholder="Phone"
              className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md shadow-sm "
            />
            <ButtonComponent type="submit" className="self-end">
              Place Order
            </ButtonComponent>
          </form>
        </div>
        <div className="total bg-light border rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 dark:text-dark">
            Order Summary
          </h2>
          <div className="flex justify-between mb-4">
            <span>Total Price:</span>
            <span>${totalPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRight;
