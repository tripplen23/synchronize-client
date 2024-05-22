import React from "react";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";

interface CartModalSummaryProps {
  totalPrice: number;
  handleClose: () => void;
  handleEmptyCart: () => void;
}

const CartModalSummary: React.FC<CartModalSummaryProps> = ({
  totalPrice,
  handleClose,
  handleEmptyCart,
}) => {
  return (
    <>
      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-semibold">€{totalPrice.toFixed(2)}</p>
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
        <ButtonComponent className="mr-4 w-full" onClick={handleEmptyCart}>
          Empty Cart
        </ButtonComponent>
        <ButtonComponent className="w-full" onClick={handleClose}>
          Go back
        </ButtonComponent>
      </div>
    </>
  );
};

export default CartModalSummary;
