"use client";

import Alert from "@mui/material/Alert";

import { useParams } from "next/navigation";
import Spinner from "@/components/spinner";
import InvoiceDetails from "@/features/invoices/components/invoice-details";
import { useGetInvoiceQuery } from "@/features/invoices/invoice-service";

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading, isError } = useGetInvoiceQuery(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !invoice) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Invoice not found
      </Alert>
    );
  }
  // NOTE: workaround for mockoon wrong behavior
  return <InvoiceDetails invoice={{ ...invoice, id }} />;
}
