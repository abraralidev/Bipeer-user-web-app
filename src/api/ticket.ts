interface Customer {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  cityId: string;
  phone: string;
  image: string;
  latitude: number | null;
  longitude: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface City {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  cityId: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  Customer: Customer;
  City: City;
}
