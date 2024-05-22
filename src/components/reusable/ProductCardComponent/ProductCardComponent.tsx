import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductReadType, ImageReadType } from "../../../misc/newProductType";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";

import { addToCart } from "../../../redux/features/newCart/cartSlice";
import { motion } from "framer-motion";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import { CgShoppingBag } from "react-icons/cg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import getImageData from "../../../helpers/getImageData";

interface ProductCardComponentProps extends ProductReadType {
  productKey: number;
}

const ProductCardComponent: FC<ProductCardComponentProps> = ({
  id,
  productKey,
  productTitle,
  productPrice,
  productDescription,
  category,
  productImages,
  productInventory,
  // productRating
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(false);

  const addToCartHandler = async () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    setIsLoadingProduct(true);
    try {
      await dispatch(
        addToCart({
          userId: user.id,
          cartItem: {
            productId: id,
            quantity: 1,
          },
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to add product to cart", error);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  /*
  const renderRatingStars = (rating: Rating) => {
    const stars = [];
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<AiOutlineStar key={`half`} className="text-yellow-500" />);
    }

    const remainingStars = 5 - stars.length;

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AiOutlineStar key={`empty-${i}`} className="text-gray-400" />
      );
    }

    return stars;
  };
  */

  const imageData = getImageData(productImages);

  return (
    <motion.div
      id={productTitle}
      key={productKey}
      tabIndex={parseInt(id)}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col max-w-xs rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
    >
      {/* Product Image */}
      <div className="flex justify-center">
        <Link to={`/products/${String(id)}`}>
          <div className="w-full h-64 relative">
            <img
              className="object-contain w-full h-full rounded-3xl"
              src={imageData}
              alt={productTitle}
            />
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="px-6 py-4 flex flex-col items-center">
        <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white xl:h-10">
          {productTitle}
        </div>
        {/*
        <div className="flex items-center mb-2 xl:mt-[8rem]">
          {rating && renderRatingStars(rating)}
        </div>
        */}
        <p className="text-gray-700 text-base mb-2 dark:text-gray-300">
          Category: {category.categoryName}
        </p>
        <p className="text-gray-900 font-bold text-xl mb-2 dark:text-gray-100">
          €{productPrice}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="px-6 py-4">
        <motion.button
          onClick={() => addToCartHandler()}
          whileHover={{ scale: 1.1 }}
          className="bg-gradient-to-r from-purple-300 to-primary rounded-full text-white text-sm font-semibold py-2 px-4 w-full"
        >
          {isLoadingProduct ? (
            <SpinnerComponent className="h-4 w-4" />
          ) : (
            <div className="flex items-center justify-center">
              <CgShoppingBag className="mr-2" />
              Add to Cart
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCardComponent;
