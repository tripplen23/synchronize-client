import newAxiosConfig from "../../utils/newAxiosConfig";
import {
  ProductCreateType,
  ProductReadType,
  ProductUpdateType,
} from "../../../misc/productType";

// Get all products
const getProducts = async (): Promise<ProductReadType[]> => {
  try {
    const response = await newAxiosConfig.get<ProductReadType[]>("products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a single product
const getProductById = async (productId: string): Promise<ProductReadType> => {
  try {
    const response = await newAxiosConfig.get<ProductReadType>(
      `products/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

// Get in category
const getProductsByCategory = async (
  categoryId: string
): Promise<ProductReadType[]> => {
  try {
    const response = await newAxiosConfig.get<ProductReadType[]>(
      `products/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching products in category with ID ${categoryId}:`,
      error
    );
    throw error;
  }
};

// Add new product
const addNewProduct = async (
  productData: ProductCreateType
): Promise<ProductReadType> => {
  try {
    const response = await newAxiosConfig.post<ProductReadType>(
      "products",
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Delete a product
const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const response = await newAxiosConfig.delete(`products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
};

// Update a product
const updateProduct = async (
  productId: string,
  productData: ProductUpdateType
): Promise<ProductReadType> => {
  try {
    const response = await newAxiosConfig.patch<ProductReadType>(
      `products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
};

const productService = {
  getProducts,
  getProductById,
  getProductsByCategory,
  addNewProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
