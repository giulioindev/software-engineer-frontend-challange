import type { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import type { Invoice } from "@/features/invoices/types/invoice";
import type { InvoiceInput } from "@/features/invoices/types/invoice-input";
import type { InvoiceStatus } from "@/features/invoices/types/invoice-status";

interface UseInvoiceFormProps {
  invoice?: Invoice;
  onSave: (data: InvoiceInput) => Promise<void>;
}

export const useInvoiceForm = ({ invoice, onSave }: UseInvoiceFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    customer: "",
    status: "draft" as InvoiceStatus,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (invoice) {
      setFormData({
        title: invoice.title,
        amount: invoice.amount.toString(),
        customer: invoice.customer,
        status: invoice.status,
      });
    }
  }, [invoice]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required";
    }
    if (formData.amount.trim() === "") {
      newErrors.amount = "Amount is required";
    } else {
      const amount = Number.parseFloat(formData.amount);
      if (Number.isNaN(amount) || amount <= 0) {
        newErrors.amount = "Amount must be a positive number";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setSubmitError(null);
      const submitData: InvoiceInput = {
        title: formData.title.trim(),
        customer: formData.customer.trim(),
        amount: Number.parseFloat(formData.amount),
        status: formData.status,
      };
      await onSave(submitData);
    } catch (error) {
      setSubmitError("Failed to save invoice. Please try again.");
      console.error("Error saving invoice:", error);
    }
  };

  const handleInputChange =
    (field: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent,
    ) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  return {
    formData,
    errors,
    submitError,
    handleSubmit,
    handleInputChange,
    setSubmitError,
  };
};
