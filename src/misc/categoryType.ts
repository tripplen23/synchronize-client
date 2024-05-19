import { UUID } from "crypto";

export interface CategoryReadType {
  categoryId: UUID;
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
