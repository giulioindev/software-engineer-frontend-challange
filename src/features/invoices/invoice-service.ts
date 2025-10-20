import { createApi } from "@reduxjs/toolkit/query/react";
import type { Invoice } from "@/features/invoices/types/invoice";
import type { InvoiceFilters } from "@/features/invoices/types/invoice-filters";
import type { InvoiceInput } from "@/features/invoices/types/invoice-input";
import type { AxiosBaseQueryParams } from "@/lib/axios-base-query";
import axiosBaseQuery from "@/lib/axios-base-query";
import type { PaginatedData } from "@/types/paginated-data";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  }),
  tagTypes: ["Invoices"],
  endpoints: (builder) => ({
    getInvoices: builder.query<PaginatedData<Invoice>, InvoiceFilters | void>({
      query: ({ page = 1, status }: InvoiceFilters) =>
        ({
          url: "/invoices",
          method: "GET",
          params: { page, status },
        }) as AxiosBaseQueryParams,
      providesTags: (result, _error, _page) =>
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
    getInvoice: builder.query<Invoice, string>({
      query: (id) =>
        ({
          url: `/invoices/${id}`,
          method: "GET",
        }) as AxiosBaseQueryParams,
      providesTags: (_result, _error, id) => [{ type: "Invoices", id }],
    }),
    createInvoice: builder.mutation<Invoice, InvoiceInput>({
      query: (invoice) =>
        ({
          url: "/invoices",
          method: "POST",
          data: invoice,
        }) as AxiosBaseQueryParams,
      invalidatesTags: [{ type: "Invoices", id: "PARTIAL-LIST" }],
    }),
    updateInvoice: builder.mutation<
      Invoice,
      { id: string; data: InvoiceInput }
    >({
      query: ({ id, data }) =>
        ({
          url: `/invoices/${id}`,
          method: "PUT",
          data,
        }) as AxiosBaseQueryParams,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Invoices", id },
        { type: "Invoices", id: "PARTIAL-LIST" },
      ],
    }),
    deleteInvoice: builder.mutation<void, string>({
      query: (id) =>
        ({
          url: `/invoices/${id}`,
          method: "DELETE",
        }) as AxiosBaseQueryParams,
      invalidatesTags: (_result, _error, id) => [
        { type: "Invoices", id },
        { type: "Invoices", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
