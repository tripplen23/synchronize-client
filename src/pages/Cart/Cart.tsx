import React from "react";
import { useAppSelector } from "../../redux/utils/hooks";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";
import EmptyCart from "./EmptyCart";

const Cart: React.FC = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <section className="section py-10 px-5">
      <TransitionEffect />
      <div className="mainContainer flex flex-col md:flex-row justify-around mx-auto max-w-7xl">
        {cart?.cartItems.length ? (
          <div className="content grid grid-cols-1 md:grid-cols-2 gap-8">
            <CartLeft />
            <CartRight />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </section>
  );
};

export default Cart;
