import { UUID } from "crypto";

export interface ImageReadType {
  id: UUID;
  imageData: string;
}

export interface ImageCreateType {
  imageData: string;
}

export interface ImageUpdateType {
  imageId: UUID;
  imageData: string;
}
