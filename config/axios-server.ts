"use server";

import axios, { AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Options for server-side API fetching.
 */
type axiosServerOptions<TParams = Record<string, unknown>, TData = unknown> = {
  params?: TParams;
  data?: TData;
  headers?: Record<string, string>;
};

/**
 * Reusable server-side API fetcher using Axios.
 * Automatically attaches auth token and base URL.
 */
const axiosServer = async <
  TResponse = unknown,
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TData = unknown
>(
  endpoint: string,
  method: Method = "GET",
  options?: axiosServerOptions<TParams, TData>
): Promise<TResponse | null> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const config: AxiosRequestConfig<TData> = {
    method,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...options?.headers,
    },
    params: options?.params,
    data: options?.data,
    timeout: 10000,
  };

  try {
    const response = await axios.request<TResponse>(config);
    return response.data;
  } catch (error) {
    // Handle 401 Unauthorized
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      redirect("/");
    }

    console.error(`Server API error (${method} ${endpoint}):`, error);
    return null;
  }
};

export default axiosServer;
