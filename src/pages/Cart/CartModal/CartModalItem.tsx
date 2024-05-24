import React from "react";
import { useAppDispatch } from "../../../redux/utils/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../../redux/features/cart/cartSlice";

interface CartModalItemProps {
  item: {
    cartId: string;
    product: {
      id: string;
      productTitle: string;
      productPrice: number;
      productImages: { imageData: string }[];
    };
    quantity: number;
  };
}

const CartModalItem: React.FC<CartModalItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between items-center border-b pb-2 mb-2">
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
        <p className="text-lg font-semibold">{item.product.productTitle}</p>
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
  );
};

export default CartModalItem;
