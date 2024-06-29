
export interface UserAddress {
    id: string;
    type: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
    customerId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ShippingAddress extends UserAddress { }
  
  export interface BillingAddress extends UserAddress { }