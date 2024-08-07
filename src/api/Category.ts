import { Product } from "./Product";

export interface Category {
  id: string;
  name: string;
  image: string;
  publish: boolean;
  createdAt: string;
  updatedAt: string;
  Product: Product[];
}

export const categoryData = [
  {
    name: "Graphics & Design",
    image:
      "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1571677246347-5040036b95cc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Writing & Translation",
    image:
      "https://images.unsplash.com/photo-1510442650500-93217e634e4c?q=80&w=1891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Video & Animation",
    image:
      "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Music & Audio",
    image:
      "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Programming & Tech",
    image:
      "https://images.unsplash.com/photo-1630168839851-d4540948a9ed?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Business",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const Reviewdata = [

  {
    id: "clxzyvb160005nyphrslbm1v6",
    rating: 5,
    review: "test rating",
    customerId: "cluqxwv6h0001zzdaxuqmzdb5",
    productId: "clxzni0xn000lj4rto0hzoo3o",
    createdAt: "2024-06-29T10:15:46.840Z",
    updatedAt: "2024-06-29T10:15:46.840Z",
    Customer: {
      id: "cluqxwv6h0001zzdaxuqmzdb5",
      name: "Abu Bakar Sultan",
      email: "abraralidev@gmail.com",
    },
  },
  {
    id: "clxzyvb160005nyphrslbm1v6",
    rating: 5,
    review: "This product is way better than expected paisa wasool hoo gya",
    customerId: "cluqxwv6h0001zzdaxuqmzdb5",
    productId: "clxzni0xn000lj4rto0hzoo3o",
    createdAt: "2024-06-29T10:15:46.840Z",
    updatedAt: "2024-06-29T10:15:46.840Z",
    Customer: {
      id: "cluqxwv6h0001zzdaxuqmzdb5",
      name: "Abrar Ali",
      email: "abraralidev@gmail.com",
    },
  },
  {
    id: "clxzyvb160005nyphrslbm1v6",
    rating: 5,
    review: "test rating",
    customerId: "cluqxwv6h0001zzdaxuqmzdb5",
    productId: "clxzni0xn000lj4rto0hzoo3o",
    createdAt: "2024-06-29T10:15:46.840Z",
    updatedAt: "2024-06-29T10:15:46.840Z",
    Customer: {
      id: "cluqxwv6h0001zzdaxuqmzdb5",
      name: "Nadeem Shah",
      email: "abraralidev@gmail.com",
    },
  },
];
