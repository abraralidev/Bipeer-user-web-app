export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface Ticket {
  title: string;
  description: string;
  cityId: string;
}

export interface City {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile extends User {
  city: string;
  cityArea: string;
  whatsapp: string;
  photoLogo: string;
  photoBanner: string;
  benefitForBipeers: string[];
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Professional extends Profile {
  profession: string;
  aboutMe: string;
  graduationYear: string;
  skills: string[];
  specializations: string[];
  workExperiences: string[];
  certifications: string[];
  rating: string;
}

export interface Vendor extends Profile {
  category: string;
  address: string;
  cityCommercialReference: string;
  cityShoppingCenter: string;
}
