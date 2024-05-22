import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/utils/hooks";
import { MdDelete } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { MdCheck } from "react-icons/md";
import { motion } from "framer-motion";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
} from "../../redux/features/newCart/cartSlice";

interface CartItemProps {
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

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      transition={{ ease: "easeInOut", duration: 0.4 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
      className="cartCardWrapper border rounded-lg overflow-hidden shadow-lg bg-white"
    >
      <Link
        to={`/products/${item.product.id}`}
        className="cartCartContainer flex items-center gap-4 p-4"
      >
        <div className="w-1/6 flex-shrink-0">
          {item.product.productImages.length > 0 &&
          item.product.productImages[0] ? (
            <img
              src={item.product.productImages[0].imageData}
              alt={item.product.productTitle}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full object-cover rounded-lg bg-gray-200">
              <img
                src="https://picsum.photos/200/?random=365"
                alt={item.product.productTitle}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {item.product.productTitle}
          </h3>
          <p className="text-gray-600">Size: 36</p>
          <p className="text-primary">€ {item.product.productPrice}</p>
          <div className="return flex items-center text-gray-600">
            <TbTruckReturn className="icon mr-1" />
            <span>14 days return available</span>
          </div>
          <div className="delivery flex items-center text-gray-600">
            <MdCheck className="icon mr-1" />
            <span>Delivery by 2 days</span>
          </div>
        </div>
      </Link>
      <div className="cartCardRight flex items-center justify-between p-4">
        <div className="cartCardRightWrapper flex items-center gap-4">
          <ButtonComponent
            className="button"
            onClick={() =>
              dispatch(
                decreaseQuantity({
                  cartId: item.cartId,
                  productId: item.product.id,
                })
              )
            }
          >
            -
          </ButtonComponent>
          <div className="text-xl font-semibold dark:text-dark">
            {item.quantity}
          </div>
          <ButtonComponent
            className="button"
            onClick={() =>
              dispatch(
                increaseQuantity({
                  cartId: item.cartId,
                  productId: item.product.id,
                })
              )
            }
          >
            +
          </ButtonComponent>
        </div>
        <ButtonComponent
          className="cartCardDelete"
          onClick={() =>
            dispatch(
              deleteItemFromCart({
                cartId: item.cartId,
                productId: item.product.id,
              })
            )
          }
        >
          <MdDelete className="icon" />
        </ButtonComponent>
      </div>
    </motion.div>
  );
};

export default CartItem;
