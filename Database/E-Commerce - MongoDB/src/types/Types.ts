export interface reqQueryType {
  sortBy: string | undefined;
  page: string | undefined;
  limit: string | undefined;
  userId: string | undefined;
  likes: string | undefined;
}

export interface UserType {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface ProductType {
  title: string;
  description: string;
  category:
    | "Apparel"
    | "Automotive"
    | "Baby"
    | "Beauty"
    | "Electronics"
    | "Food"
    | "Home"
    | "Toys"
    | "Industrial";
  price: number;
  quantity: number;
  createdBy: string;
}

export interface OrderItemType {
  productId: string;
  price: number;
  quantity: number;
}

export interface OrderType {
  userId: string;
  orderItems: OrderItemType[];
  totalPrice: number;
}
