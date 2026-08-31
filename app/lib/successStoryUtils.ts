export type SuccessImage = {
  id: string;
  src: string;
};

export type SuccessCategory = {
  _id: string;
  name: string;
  images: SuccessImage[];
  createdAt: string;
};
