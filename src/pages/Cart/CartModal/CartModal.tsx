import React from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/utils/hooks";
import ModalComponent from "../../../components/reusable/ModalComponents/ModalComponent";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { deleteCart } from "../../../redux/features/newCart/cartSlice";
import CartModalItem from "./CartModalItem";
import CartModalSummary from "./CartModalSummary";

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

  const handleEmptyCart = () => {
    if (cart) {
      dispatch(deleteCart(cart.id));
    }
  };

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
            <CartModalItem key={item.product.id} item={item} />
          ))}
          <CartModalSummary
            totalPrice={totalPrice ?? 0}
            handleClose={handleClose}
            handleEmptyCart={handleEmptyCart}
          />
        </div>
      </motion.div>
    </ModalComponent>
  );
};

export default CartModal;
