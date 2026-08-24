import { STORAGE_KEYS } from "@/utils/roles-enum";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";

// Define a client object with the API instance
const options = {
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
};

const client = axios.create(options);

let context = <GetServerSidePropsContext>{};

export const setCookieContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

// Add a request interceptor
client.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token =
      context?.req?.cookies?.token || Cookies.get(STORAGE_KEYS.TOKEN);

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
    const errorResponse = JSON.parse(error["response"]?.data);

    return Promise.reject(errorResponse?.message);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return JSON.parse(response.data);
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      return handleAuthError(error);
    }

    if (axios.isCancel(error ?? error.code === "ERR CANCELED")) {
      return Promise.reject(error);
    }

    if (!error.response) {
      return Promise.reject(
        new Error(
          "We are unable to connect to the server. Please check your internet connection."
        )
      );
    }

    const errorResponse = JSON.parse(error["response"]?.data);

    return Promise.reject(
      errorResponse ?? `An unknown error occurred, please try again.`
    );
  }
);

export default client;

const handleAuthError = (error: unknown) => {
  if (typeof window === "undefined") {
    if (context?.res) {
      context?.res?.setHeader("Set-Cookie", [
        "access_token=; Max-Age=0; Path=/;",
        "refresh_token=; Max-Age=0; Path=/;",
        "is_verified=; Max-Age=0; Path=/;",
      ]);
      context?.res?.writeHead(302, { Location: "/" });
      context?.res?.end();
    }
  } else {
    Cookies.remove("access_token");
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    Cookies.remove("is_verified");
  }

  return Promise.reject(error);
};
