import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Order Placed Successfully!
      </h2>
      <p className="text-center">
        Your order has been placed successfully. You will receive a confirmation
        email shortly.
      </p>
      <ButtonComponent className="mt-4" onClick={() => navigate("/")}>
        Go to Home
      </ButtonComponent>
    </div>
  );
};

export default OrderSuccess;
