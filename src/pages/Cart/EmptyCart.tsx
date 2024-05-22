import React from "react";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";

const EmptyCart: React.FC = () => {
  return (
    <div className="noCartItems text-center flex flex-col">
      <p className="text-gray-600 text-lg mb-5">No Items Here</p>
      <ButtonComponent to="/catalog">Shop Now</ButtonComponent>
    </div>
  );
};

export default EmptyCart;
