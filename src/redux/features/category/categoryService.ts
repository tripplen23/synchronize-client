import newAxiosConfig from "../../utils/newAxiosConfig";
import {
  CategoryReadType,
  CategoryCreateType,
  CategoryUpdateType,
} from "../../../misc/categoryType";

const getAllCategories = async (): Promise<CategoryReadType[]> => {
  try {
    const response = await newAxiosConfig.get<CategoryReadType[]>("categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const getCategoryById = async (
  categoryId: string
): Promise<CategoryReadType> => {
  try {
    const response = await newAxiosConfig.get<CategoryReadType>(
      `categories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${categoryId}:`, error);
    throw error;
  }
};

const createCategory = async (
  categoryData: CategoryCreateType
): Promise<CategoryReadType> => {
  try {
    const response = await newAxiosConfig.post<CategoryReadType>(
      "categories",
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const updateCategory = async (
  categoryId: string,
  categoryData: CategoryUpdateType
): Promise<CategoryReadType> => {
  try {
    const response = await newAxiosConfig.patch<CategoryReadType>(
      `categories/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating category with ID ${categoryId}:`, error);
    throw error;
  }
};

const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const response = await newAxiosConfig.delete<boolean>(
      `categories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error);
    throw error;
  }
};

const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory, // Admin only
  updateCategory, // Admin only
  deleteCategory, // Admin only
};

export default categoryService;
