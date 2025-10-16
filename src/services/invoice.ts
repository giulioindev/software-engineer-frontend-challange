import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosBaseQueryParams } from "@/lib/axios-base-query";
import axiosBaseQuery from "@/lib/axios-base-query";
import type { Invoice } from "@/types/invoice";
import type { PaginatedData } from "@/types/paginated-data";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  }),
  tagTypes: ["Invoices"],
  endpoints: (builder) => ({
    getInvoices: builder.query<PaginatedData<Invoice>, number | void>({
      query: (page = 1) =>
        ({
          url: "/invoices",
          method: "GET",
          params: { page },
        }) as AxiosBaseQueryParams,
      providesTags: (result, error, page) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Invoices" as const,
                id,
              })),
              { type: "Invoices", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Invoices", id: "PARTIAL-LIST" }],
    }),
  }),
});

export const { useGetInvoicesQuery } = invoiceApi;
