import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { getAuthProfile } from "../../redux/features/auth/authSlice";
import {
  getProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
} from "../../redux/features/newProduct/productSlice";
import AddingModalComponent from "../../components/reusable/ModalComponents/AddingModalComponent";
import UpdatingModalComponent from "../../components/reusable/ModalComponents/UpdatingModalComponent";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";
import SpinnerComponent from "../../components/reusable/SpinnerComponent/SpinnerComponent";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";
import {
  ProductCreateType,
  ProductReadType,
  ProductUpdateType,
} from "../../misc/newProductType";

const AdminDashboard = () => {
  const { products, isLoading } = useAppSelector((state) => state.product);
  const { user, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductReadType | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Fetch auth information
  useEffect(() => {
    dispatch(getAuthProfile());
  }, [dispatch]);

  // Handler for adding products
  const handleAdd = (productData: ProductCreateType) => {
    dispatch(addNewProduct(productData));
    setIsAddingModalOpen(false);
  };

  const handleUpdateClick = (product: ProductReadType) => {
    setSelectedProduct(product);
    setIsUpdatingModalOpen(true);
  };

  const handleUpdate = (updatedProductData: ProductUpdateType) => {
    if (selectedProduct) {
      dispatch(
        updateProduct({
          productId: updatedProductData.id,
          productData: updatedProductData,
        })
      );
    }
    setIsUpdatingModalOpen(false);
  };

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  // Calculate total number of pages:
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current page products:
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto mt-8 mb-8 ipadMini:my-20">
      <TransitionEffect />
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <br />
        <div className="profileInfo flex flex-col">
          <span className="name">Admin Name: {`${user?.userName}`}</span>
          <span className="email">
            Email: <strong>{user?.userEmail}</strong>
          </span>
        </div>
      </div>

      <div className="bg-light dark:bg-dark p-8 rounded shadow ipadMini:hidden">
        {isLoading ? (
          <div>
            <SpinnerComponent />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Product list</h2>
              <div className="flex space-x-3">
                <ButtonComponent onClick={() => setIsAddingModalOpen(true)}>
                  + Add Product
                </ButtonComponent>
              </div>
            </div>

            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    Product ID
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Product Title
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Inventory
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Image
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageProducts().map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{product.id}</td>
                    <td className="px-4 py-4">{product.productTitle}</td>
                    <td className="px-4 py-4">{product.productDescription}</td>
                    <td className="px-4 py-4">{product.productPrice}</td>
                    <td className="px-4 py-4">{product.categoryId}</td>
                    <td className="px-4 py-4">{product.productInventory}</td>
                    <td className="px-4 py-4">
                      {product.productImages.length > 0 && (
                        <img
                          src={product.productImages[0].imageData}
                          alt={product.productTitle}
                          className="w-20 h-20 object-cover"
                        />
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <ButtonComponent
                          onClick={() => handleUpdateClick(product)}
                        >
                          Edit
                        </ButtonComponent>
                        <ButtonComponent
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </ButtonComponent>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 mx-1 ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-light dark:bg-dark p-8 rounded shadow hidden ipadMini:block">
        <div className="text-center flex flex-col items-center space-y-6">
          <h1 className="font-bold">Admin actions cannot be performed here!</h1>
          <Link to="/products">
            <ButtonComponent>View products instead</ButtonComponent>
          </Link>
        </div>
      </div>

      <AddingModalComponent
        isOpen={isAddingModalOpen}
        onClose={() => setIsAddingModalOpen(false)}
        onAdd={handleAdd}
      />

      {selectedProduct && (
        <UpdatingModalComponent
          isOpen={isUpdatingModalOpen}
          onClose={() => setIsUpdatingModalOpen(false)}
          onUpdate={handleUpdate}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
