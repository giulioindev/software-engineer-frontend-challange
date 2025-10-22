import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

export interface AxiosBaseQueryArgs {
  baseUrl: string;
}

export interface AxiosBaseQueryParams {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export interface AxiosBaseQueryResult {
  data: unknown;
}

const axiosBaseQuery =
  ({
    baseUrl,
  }: AxiosBaseQueryArgs): BaseQueryFn<
    AxiosBaseQueryParams,
    AxiosBaseQueryResult,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        timeout: 10000,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      console.error(error);
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
