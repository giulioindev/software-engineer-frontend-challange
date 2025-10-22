"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useInvoiceForm } from "@/features/invoices/hooks/use-invoice-form";
import type { Invoice } from "@/features/invoices/types/invoice";

interface InvoiceFormProps {
  readonly invoice?: Invoice;
  readonly onSave: () => void;
  readonly onCancel: () => void;
}

export default function InvoiceForm({
  invoice,
  onSave,
  onCancel,
}: Readonly<InvoiceFormProps>) {
  const {
    formData,
    validationErrors,
    isSubmitting,
    isSuccess,
    submitError,
    handleSubmit,
    handleInputChange,
    setSubmitError,
  } = useInvoiceForm({ invoice });
  const isEdit = !!invoice;

  useEffect(() => {
    if (isSuccess) {
      onSave();
    }
  }, [isSuccess, onSave]);

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={onCancel} sx={{ mr: 2 }}>
          Back
        </Button>
        <Typography variant="h4" component="h1">
          {isEdit ? "Edit Invoice" : "Create New Invoice"}
        </Typography>
      </Box>

      {submitError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setSubmitError(null)}
        >
          {submitError}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Invoice Title"
                  value={formData.title}
                  onChange={handleInputChange("title")}
                  error={!!validationErrors.title}
                  helperText={validationErrors.title}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={formData.customer}
                  onChange={handleInputChange("customer")}
                  error={!!validationErrors.customer}
                  helperText={validationErrors.customer}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange("amount")}
                  error={!!validationErrors.amount}
                  helperText={validationErrors.amount}
                  disabled={isSubmitting}
                  slotProps={{ htmlInput: { step: 0.01 } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={handleInputChange("status")}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} />
                      ) : (
                        <SaveIcon />
                      )
                    }
                    disabled={isSubmitting}
                  >
                    {(() => {
                      if (isSubmitting) return "Saving...";
                      return isEdit ? "Update Invoice" : "Create Invoice";
                    })()}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
