import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ProductUpdateType, ProductReadType } from "../../../misc/newProductType";

interface UpdatingModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProductData: ProductUpdateType) => void;
  product: ProductReadType;
}

const UpdatingModalComponent: React.FC<UpdatingModalComponentProps> = ({
  isOpen,
  onClose,
  onUpdate,
  product,
}) => {
  const [productTitle, setProductTitle] = useState(product.productTitle);
  const [productDescription, setProductDescription] = useState(product.productDescription);
  const [productPrice, setProductPrice] = useState(product.productPrice);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [productInventory, setProductInventory] = useState(product.productInventory);

  useEffect(() => {
    if (product) {
      setProductTitle(product.productTitle);
      setProductDescription(product.productDescription);
      setProductPrice(product.productPrice);
      setCategoryId(product.categoryId);
      setProductInventory(product.productInventory);
    }
  }, [product]);

  const handleSubmit = () => {
    const updatedProductData: ProductUpdateType = {
      id: product.id,
      productTitle,
      productDescription,
      productPrice,
      categoryId,
      productInventory,
    };
    onUpdate(updatedProductData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Update Product
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title:
            </label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description:
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price:
            </label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category ID:
            </label>
            <input
              type="text"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Inventory:
            </label>
            <input
              type="number"
              value={productInventory}
              onChange={(e) => setProductInventory(Number(e.target.value))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdatingModalComponent;
