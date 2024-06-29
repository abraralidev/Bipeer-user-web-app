interface City {
  id: string;
  name: string;
}

interface Vendor {
  id: string;
}

export interface Shop {
  id: string;
  name: string;
  phone: string;
  image: string;
  address: string;
  latitude: string;
  longitude: string;
  sundayFrom: string | null;
  sundayTo: string | null;
  mondayFrom: string | null;
  mondayTo: string | null;
  tuesdayFrom: string | null;
  tuesdayTo: string | null;
  wednesdayFrom: string | null;
  wednesdayTo: string | null;
  thursdayFrom: string | null;
  thursdayTo: string | null;
  fridayFrom: string | null;
  fridayTo: string | null;
  saturdayFrom: string | null;
  saturdayTo: string | null;
  active: boolean;
  rating: number;
  vendorId: string;
  cityId: string;
  createdAt: string;
  updatedAt: string;
  mallId: string;
  shopCategoryId: string | null;
  City: City;
  Vendor: Vendor;
  Product: any[];
}
