import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { getAllCategories } from "../../../redux/features/category/categorySlice";
import {
  ProductCreateType,
  ImageCreateType,
} from "../../../misc/newProductType";
import imageCompression from "browser-image-compression";

Modal.setAppElement("#root");

interface AddingProductModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (productData: ProductCreateType) => void;
}

const AddingProductModalComponent: React.FC<
  AddingProductModalComponentProps
> = ({ isOpen, onClose, onAdd }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [productInventory, setProductInventory] = useState(0);
  const [productImages, setProductImages] = useState<ImageCreateType[]>([]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const convertedImages: ImageCreateType[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
        });
        const base64Image = await imageCompression.getDataUrlFromFile(
          compressedFile
        );
        convertedImages.push({ imageData: base64Image });
      }
      setProductImages(convertedImages);
    }
  };

  const handleSubmit = () => {
    const productData: ProductCreateType = {
      productTitle,
      productDescription,
      productPrice,
      categoryId,
      productInventory,
      productImages,
    };
    onAdd(productData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-light">
          Add New Product
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
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring focus:ring-indigo-200 sm:text-sm"
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
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring focus:ring-indigo-200 sm:text-sm"
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
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring focus:ring-indigo-200 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category ID : "Women" - "Jewelery" - "Electronics" - "Men"
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring focus:ring-indigo-200 sm:text-sm"
            >
              <option>Select a category ID</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryId}
                </option>
              ))}
            </select>
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
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring focus:ring-indigo-200 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Images:
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-1 block w-full file-upload"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddingProductModalComponent;
