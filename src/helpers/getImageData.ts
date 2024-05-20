import { ImageReadType } from "../misc/newProductType";

const getImageData = (images: ImageReadType[] | undefined): string => {
  if (!images || images.length === 0) {
    return "https://picsum.photos/200/?random=365";
  }
  return images[0].imageData;
};

export default getImageData;
