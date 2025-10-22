"use client";

import { useRouter } from "next/navigation";
import InvoiceForm from "@/features/invoices/components/invoice-form";

export default function NewInvoicePage() {
  const router = useRouter();

  return (
    <InvoiceForm
      onSave={() => router.push("/invoices")}
      onCancel={() => router.push("/invoices")}
    />
  );
}
