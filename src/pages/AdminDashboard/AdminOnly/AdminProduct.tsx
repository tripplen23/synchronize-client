import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import {
  getProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
} from "../../../redux/features/product/productSlice";
import AddingProductModalComponent from "../../../components/reusable/ModalComponents/AddingProductModalComponent";
import UpdatingProductModalComponent from "../../../components/reusable/ModalComponents/UpdatingProductModalComponent";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import {
  ProductCreateType,
  ProductReadType,
  ProductUpdateType,
} from "../../../misc/productType";
import { Link } from "react-router-dom";
import TransitionEffect from "../../../components/reusable/TransitionEffect/TransitionEffect";
import { toast } from "react-toastify";

const AdminProduct = () => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductReadType | null>(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAdd = async (productData: ProductCreateType) => {
    try {
      await dispatch(addNewProduct(productData)).unwrap();
      toast.success("Product added successfully");
      dispatch(getProducts());
      setIsAddingModalOpen(false);
    } catch (error: any) {
      toast.error(
        `Failed to add product with status ${error.status}: ${error.message}`
      );
    }
  };

  const handleUpdateClick = (product: ProductReadType) => {
    setSelectedProduct(product);
    setIsUpdatingModalOpen(true);
  };

  const handleUpdate = async (updatedProductData: ProductUpdateType) => {
    if (selectedProduct) {
      try {
        await dispatch(
          updateProduct({
            productId: updatedProductData.id,
            productData: updatedProductData,
          })
        ).unwrap();
        toast.success("Product updated successfully");
        dispatch(getProducts());
        setIsUpdatingModalOpen(false);
      } catch (error: any) {
        toast.error(
          `Failed to update product with status ${error.status}: ${error.message}`
        );
      }
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success("Product deleted successfully");
      dispatch(getProducts());
    } catch (error: any) {
      toast.error(
        `Failed to delete product with status ${error.status}: ${error.message}`
      );
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-light dark:bg-dark p-8 rounded shadow">
      <TransitionEffect />
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Product List</h2>
          <ButtonComponent onClick={() => setIsAddingModalOpen(true)}>
            + Add Product
          </ButtonComponent>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-4">Product ID</th>
              <th className="px-4 py-4">Product Title</th>
              <th className="px-4 py-4">Description</th>
              <th className="px-4 py-4">Price</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Inventory</th>
              <th className="px-4 py-4">Image</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageProducts().map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-4 py-4">{product.id}</td>
                <td className="px-4 py-4">
                  <Link to={`/products/${String(product.id)}`}>
                    <div className="hover:underline">
                      {product.productTitle}
                    </div>
                  </Link>
                </td>
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
                      className="dark:bg-primary"
                      onClick={() => handleUpdateClick(product)}
                    >
                      Edit
                    </ButtonComponent>
                    <ButtonComponent
                      className="dark:bg-red-300"
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
        <div className="flex justify-center mt-6 ">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </>

      <AddingProductModalComponent
        isOpen={isAddingModalOpen}
        onClose={() => setIsAddingModalOpen(false)}
        onAdd={handleAdd}
      />
      {selectedProduct && (
        <UpdatingProductModalComponent
          isOpen={isUpdatingModalOpen}
          onClose={() => setIsUpdatingModalOpen(false)}
          onUpdate={handleUpdate}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AdminProduct;
