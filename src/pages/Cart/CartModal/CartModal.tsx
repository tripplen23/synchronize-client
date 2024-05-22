import React from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/utils/hooks";
import ModalComponent from "../../../components/reusable/ModalComponents/ModalComponent";
import { useMediaQuery } from "react-responsive";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import { motion } from "framer-motion";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} from "../../../redux/features/newCart/cartSlice";

interface CartModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalProps> = ({ show, setShow }) => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = cart?.cartItems.reduce(
    (total, item) => total + item.quantity * item.product.productPrice,
    0
  );

  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const handleClose = () => setShow(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <ModalComponent isOpen={show} onClose={handleClose} isRight={isBigScreen}>
      <motion.div
        className="container rounded-lg overflow-hidden shadow-xl bg-white w-92 max-w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex flex-col items-center">
            Your Cart
          </h3>
          {cart?.cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center border-b pb-2 mb-2"
            >
              <div className="w-16 h-16 mr-4">
                <img
                  src={
                    item.product.productImages[0]?.imageData ||
                    "https://via.placeholder.com/64"
                  }
                  alt={item.product.productTitle}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold">
                  {item.product.productTitle}
                </p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x €{item.product.productPrice}
                </p>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity({
                          cartId: item.cartId,
                          productId: item.product.id,
                        })
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded-md text-lg font-semibold"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity({
                          cartId: item.cartId,
                          productId: item.product.id,
                        })
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded-md text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-lg font-semibold">
                €{(item.quantity * item.product.productPrice).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">
              €{(totalPrice ?? 0).toFixed(2)}
            </p>
          </div>
          <div className="flex mt-4 justify-between">
            <ButtonComponent className="mr-4" to="/cart" onClick={handleClose}>
              Your Cart
            </ButtonComponent>
            <ButtonComponent to="/cart" onClick={handleClose}>
              Check out
            </ButtonComponent>
          </div>
          <div className="flex mt-4 justify-between">
            <ButtonComponent
              className="mr-4 w-full"
              onClick={() => cart && dispatch(deleteCart(cart.id))}
            >
              Empty Cart
            </ButtonComponent>
            <ButtonComponent className="w-full" onClick={handleClose}>
              Go back
            </ButtonComponent>
          </div>
        </div>
      </motion.div>
    </ModalComponent>
  );
};

export default CartModal;
