import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import { MdArrowBack } from "react-icons/md";
import { deleteCart } from "../../redux/features/cart/cartSlice";
import CartItem from "./CartItem";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";

const CartLeft: React.FC = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="cartLeft space-y-8 mr-8">
      <div className="titleContainer flex items-center mb-8 md:mb-0">
        <ButtonComponent
          className="iconContainer mr-2"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack className="icon" />
        </ButtonComponent>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-light">
          Shopping Bag
        </h1>
      </div>

      {cart?.cartItems.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}

      <div
        className="emptyCart text-red-500 font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => cart && dispatch(deleteCart(cart.id))}
      >
        Empty Cart
      </div>
    </div>
  );
};

export default CartLeft;
