import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import {
  getProductsByCategory,
  getProducts,
  sortProductsByPrice,
} from "../../redux/features/newProduct/productSlice";
import { getAllCategories } from "../../redux/features/category/categorySlice";
import ProductCardComponent from "../../components/reusable/ProductCardComponent/ProductCardComponent";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import GoToTopComponent from "../../components/reusable/GoToTopComponent/GoToTopComponent";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const Catalog = () => {
  let { id } = useParams();
  const { products } = useAppSelector((state) => state.product);
  const { categories, isLoading: categoriesLoading } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sortByPrice, setSortByPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!categoriesLoading && categories.length > 0) {
      if (!id) {
        navigate(`/catalog/All`);
        id = "All";
      }

      setCurrentPage(1);

      if (id === "All") {
        dispatch(getProducts());
      } else {
        const category = categories.find(
          (cat) => cat.categoryName.toLowerCase() === id?.toLowerCase()
        );
        if (category) {
          dispatch(getProductsByCategory(category.categoryId));
        }
      }
    }
  }, [id, categoriesLoading, categories, dispatch, navigate]);

  const convertedString = id
    ?.split("-")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");

  // TODO: Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // TODO: sortProductsByPrice handler
  const sortByPriceHandler = (event: any) => {
    const sortOrder = event.target.value;
    setSortByPrice(sortOrder);
    dispatch(sortProductsByPrice(sortOrder));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TransitionEffect />
      {/* header components */}
      <div className="flex items-center justify-between mb-16">
        <ButtonComponent onClick={() => navigate(-1)}>
          <MdArrowBack />
        </ButtonComponent>

        <div className="relative flex items-end flex-col justify-between mb-4">
          <h2 className="text-3xl font-bold mb-2">{convertedString}</h2>
          {/* Sort by price drop down */}
          <select
            onChange={sortByPriceHandler}
            value={sortByPrice}
            className="py-2 px-4 rounded-lg bg-light dark:bg-dark dark:text-light border-4 border-gray-600 text-gray-800 appearance-none cursor-pointer hover:border-gray-400 focus:outline-none focus:border-primary "
          >
            <option selected hidden>
              Sort By Price
            </option>
            <option value="asc">Low to high</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {currentProducts.map((product, index) => (
          <ProductCardComponent
            id={product.id}
            key={index}
            productKey={index}
            productTitle={product.productTitle}
            productPrice={product.productPrice}
            category={product.category}
            productImages={product.productImages}
            productInventory={product.productInventory}
            productDescription={product.productDescription}
            categoryId={product.categoryId}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`${
              i + 1 === currentPage
                ? "bg-primary text-light"
                : "text-light hover:bg-pink-300 bg-gray-900"
            } mx-1 py-1 px-3 rounded-lg transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <GoToTopComponent />
    </div>
  );
};

export default Catalog;
