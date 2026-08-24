import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

import storage from "./storage";

// Helper function to check if the code is running on the server
const isServer = typeof window === "undefined";

// Define a client object with the API instance
const axiosClient: {
  Api: AxiosInstance;
} = {
  Api: axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Accept: "application/json",
      Pragma: "no-cache",
    },
    transformResponse: [(response: AxiosResponse) => response],
    timeout: 30000,
    maxRedirects: 0,
    withCredentials: false,
  }),
};

// Function to find the access token from cookies, depending on whether it's server-side or client-side
const findAccessToken = () => {
  if (!isServer) {
    return Cookies.get("token");
  }
};

// Add a request interceptor
axiosClient.Api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = findAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Remove JSON content-type if sending FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  function (error) {
    // Do something with request error
    // return Promise.reject(error);
    const errorResponse =
      error?.response?.data === "string"
        ? JSON.parse(error["response"].data)
        : error.response?.data;

    toast.error(errorResponse?.message);

    const rejectionError =
      error instanceof Error ? error : new Error(error.message);
    return Promise.reject(rejectionError);
  }
);

// Add a response interceptor
axiosClient.Api.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return JSON.parse(response.data);
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.error("error", error.response.status);

    if (error.response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("doctorId");
      storage.clearAll();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    if (axios.isCancel(error ?? error.code === "ERR CANCELED")) {
      return Promise.reject(error);
    }

    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(new Error("Network error"));
    }

    const errorResponse = JSON.parse(error["response"]?.data);
    toast.error(errorResponse?.message);

    const rejectionError =
      error instanceof Error ? error : new Error(error.message);
    return Promise.reject(rejectionError);
  }
);

export default axiosClient;
