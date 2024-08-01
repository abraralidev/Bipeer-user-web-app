import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "@/api/axios";
import { AxiosRequestConfig } from "axios";
import { signOut, useSession } from "next-auth/react";

const { REACT_APP_API_URL } = process.env;

interface useAxios<R> {
  isLoading: boolean;
  data: R;
}

export interface useAxiosReturnType<P, R> extends useAxios<R> {
  categories: any;
  makeRequest: (
    success?: (data: R) => void,
    error?: (message: string) => void,
    data?: Payload<P>,
    config?: AxiosRequestConfig
  ) => void;
}

interface Payload<P> {
  body?: P;
  params?: {
    [key: string]: string | number;
  };
  query?: {
    [key: string]: string | number;
  };
}

export function useAxios<R = any, P = any>(
  endpoint: keyof typeof endPoints,
  runOnMount = false,
  payload?: Payload<P>,
  additionalDependencies: any[] = []
): useAxiosReturnType<P, R> {
  const [values, setValues] = useState<useAxios<R>>({
    isLoading: false,
    data: {} as R,
  });
  const session = useSession();

  async function makeRequest(
    success?: (data: R) => void,
    error?: (message: string) => void,
    data?: Payload<P>,
    config?: AxiosRequestConfig
  ) {
    setValues({ data: {} as R, isLoading: true });
    let url: string = endPoints[endpoint].url;
    let prefix = endPoints[endpoint]?.prefix;

    url = `${prefix}${url}`;

    if (data?.params) {
      Object.keys(data.params).forEach((key) => {
        url = url.replace(`{${key}}`, data.params?.[key] as string);
      });
    }

    if (data?.query) {
      const queryParams = new URLSearchParams();
      Object.keys(data.query).forEach((key) => {
        queryParams.append(key, data.query?.[key] as string);
      });

      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}${queryParams.toString()}`;
    }

    axiosInstance({
      url,
      method: endPoints[endpoint].method,
      data: data?.body,
      ...(config ?? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.backendToken?.token}`,
        },
      }),
    })
      .then(({ data }: any) => {
        setValues({ data: data?.data ?? data, isLoading: false });
        success?.(data?.data ?? data);
      })
      .catch((err: any) => {
        setValues({ data: {} as R, isLoading: false });
        error?.(err?.response?.data?.message || err?.message);

        if (err?.response?.status === 401) {
          signOut();
        }
      });
  }

  const dependencies = useMemo(() => {
    return [session.data?.backendToken?.token, ...additionalDependencies];
  }, [session.data?.backendToken?.token, additionalDependencies]);

  useEffect(() => {
    if (runOnMount) {
      makeRequest(
        () => {},
        () => {},
        payload
      );
    }
  }, dependencies);

  return {
    ...values,
    makeRequest,
  };
}

const BASE_URLS = {
  AUTH: "https://listing-backend-z4i5.onrender.com",
};
const endPoints = {
  SLIDER: {
    url: "/slider/getall",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  CATEGORIES: {
    url: "/category/getallproductcategories",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PRODUCTS: {
    url: "/product/getall",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  MALLS: {
    url: "/mall/getall",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PRODUCTS_BY_CITY: {
    url: "/product/getByCity/{cityId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  VENDORS: {
    url: "/user/getVendors",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  POINTS_OF_INTERESTS_BY_CITYID: {
    url: "/city/pointerest/getall/{cityId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PRODUCTS_BY_CITY_AREA_ID: {
    url: "/product/filter/getByCityArea/{cityAreaId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PRODUCTS_BY_POINT_OF_INTEREST_ID: {
    url: "/product/filter/getByPointOfInterest/{pointerestId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  CITY_AREA_BY_CITYID: {
    url: "/city/areas/getall/{cityId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  SHOPS: {
    url: "/shop/getall",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  SHOPS_BY_CITY: {
    url: "/shop/search/city/{cityId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  SHOPS_BY_MallID: {
    url: "/shop/getall/mall/{mallId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PRIVACY_POLICY: {
    url: "/policy/privacyPolicy",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  TERMS_AND_CONDITIONS: {
    url: "/policy/termsAndConditions",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PRODUCT: {
    url: "/product/get/{id}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  CURRENT_PROFILE: {
    url: "/customer/getprofile",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  LOGIN_CUSTOMER: {
    url: "/user/login/customer",
    method: "POST",
    prefix: BASE_URLS.AUTH,
  },
  LOGOUT_CUSTOMER: {
    url: "/user/login/customer",
    method: "POST",
    prefix: BASE_URLS.AUTH,
  },
  PRODUCTS_BY_Filter: {
    url: "/product/filter/getByQuery",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PRODUCTS_BY_CATEGORY: {
    url: "/product/getByCategory/{categoryId}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  CATEGORIES_OF_PRODUCTS: {
    url: "/category/getallproductcategories",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  CATEGORIES_OF_PROFESSIONALS: {
    url: "/professional/taxonomy/main/getall",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  CATEGORY_BY_VENDOR: {
    url: "/shop/taxonomy/main/getall",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  VENDOR_BY_MAIN_CATEGORY: {
    url: "/shop/search/category/main/{id}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PROS_BY_MAIN_CATEGORY: {
    url: "/professional/search/category/main/{id}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PROS_BY_SUB_CATEGORY: {
    url: "/professional/search/category/sub/{id}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  VENDOR_BY_SUB_CATEGORY: {
    url: "/shop/search/category/sub/{id}",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  BILLING_ADDRESS: {
    url: "/address/getBillingAddress",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  SHIPPING_ADDRESS: {
    url: "/address/getShippingAddress",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  PLACE_ORDER: {
    url: "/order/create",
    method: "POST",
    prefix: BASE_URLS.AUTH,
  },
  GET_CITIES: {
    url: "/city/getall",
    method: "GET",
    prefix: BASE_URLS.AUTH,
  },
  REGISTER: {
    url: "/user/signup/customer",
    method: "POST",
    prefix: BASE_URLS.AUTH,
  },
  CREATE_BILLING: {
    method: "POST",
    prefix: BASE_URLS.AUTH,
    url: "/address/addBillingAddress",
  },
  CREATE_SHIPPING: {
    method: "POST",
    prefix: BASE_URLS.AUTH,
    url: "/address/addShippingAddress",
  },
  GET_PROFESSIONAL: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/user/getProfessionals",
  },
  GET_SERVICES: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/professional/getallservices",
  },
  GET_SERVICE_BY_ID: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/professional/service/{id}",
  },
  CREATE_SERVICE_ORDER: {
    method: "POST",
    prefix: BASE_URLS.AUTH,
    url: "/professionalOrder/create",
  },
  CREATE_TICKET: {
    method: "POST",
    prefix: BASE_URLS.AUTH,
    url: "/ticket/create",
    headers: {
      "Content-Type": "application/json",
      // token: `${session.data?.backendToken?.token}`,
    },
  },
  GET_ALL_TICKETS: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/ticket/customer/all",
    headers: {
      "Content-Type": "application/json",
      // token: `${session.data?.backendToken?.token}`,
    },
  },
  GET_SHOPS: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/admin/shops/location",
  },
  GET_CUSTOMER_PROFILE: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/customer/getprofile",
  },
  UPDATE_CUSTOMER_PROFILE: {
    method: "POST",
    prefix: BASE_URLS.AUTH,
    url: "/customer/updateprofile",
  },

  GET_PRODUCT_REVIEWS: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/product/getAllReviews/{id}",
  },

  GET_SERVICE_REVIEWS: {
    method: "GET",
    prefix: BASE_URLS.AUTH,
    url: "/service/search/getAllReviews/{id}",
  },
};
