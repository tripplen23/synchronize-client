import React from "react";
import { useAppSelector } from "../../redux/utils/hooks";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";

const CartRight: React.FC = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const totalPrice = cart?.cartItems.reduce(
    (total, item) => total + item.quantity * item.product.productPrice,
    0
  );

  return (
    <div className="cartRight mt-16">
      <div className="coupon bg-light border rounded-lg p-6 shadow-lg mb-5">
        <h2 className="text-lg font-semibold mb-4 dark:text-dark">Coupons</h2>
        <div className="couponContent flex items-center gap-4">
          <div className="flex-grow">
            <div className="relative mt-1">
              <input
                type="text"
                className="block md:w-72 ipadMini:w-48 xl:w-96 surfaceDuo:w-48 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-dark sm:text-sm"
                placeholder="Enter coupon code"
              />
              <ButtonComponent className="button absolute top-0 right-10 ipadPro:right-0 h-full px-4 py-2">
                Apply
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      <div className="priceDetails bg-white border rounded-lg p-6 shadow-lg dark:text-dark">
        <h2 className="text-lg font-semibold mb-4">Price Details</h2>
        <div className="priceContent flex justify-between">
          <div className="title">Total price</div>
          <div className="price">€{(totalPrice ?? 0).toFixed(2)}</div>
        </div>
        <div className="priceContent flex justify-between">
          <div className="title">Shipping cost</div>
          <div className="price">FREE</div>
        </div>
        <div className="totalContent flex justify-between items-center mt-4">
          <div className="title text-lg font-semibold">Total Amount</div>
          <div className="price text-lg font-semibold">
            €{(totalPrice ?? 0).toFixed(2)}
          </div>
        </div>
        <ButtonComponent className="button mt-6 w-full">
          Place Order
        </ButtonComponent>
      </div>
    </div>
  );
};

export default CartRight;
