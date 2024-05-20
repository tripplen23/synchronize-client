export interface CategoryReadType {
  categoryId: string;
  categoryName: string;
  categoryImage: string;
}

export interface CategoryCreateType {
  categoryName: string;
  categoryImage: string;
}

export interface CategoryUpdateType {
  categoryName?: string;
  categoryImage?: string;
}
