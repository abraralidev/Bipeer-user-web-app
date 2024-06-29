import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the user object shape
interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  cityId: string | null;
  phone: string;
  image: string;
  latitude: string;
  longitude: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  City: string | null;
  token:string | null;
}

interface UserContextType {
  user: User;
}

const defaultUser: UserContextType = {
  user: {
    id: "",
    email: "",
    name: "",
    address: "",
    cityId: null,
    phone: "",
    image: "",
    latitude: "",
    longitude: "",
    active: true,
    createdAt: "",
    updatedAt: "",
    City: null,
    token: null
  }
};

// Define the context type
interface UserContextValue {
  user: UserContextType;
  setUser: React.Dispatch<React.SetStateAction<UserContextType>>;
}

// Create context with a default value
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Create provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access to the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
