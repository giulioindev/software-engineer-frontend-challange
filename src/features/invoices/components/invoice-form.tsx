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
import { useInvoiceForm } from "@/features/invoices/hooks/use-invoice-form";
import type { Invoice } from "@/features/invoices/types/invoice";
import type { InvoiceInput } from "@/features/invoices/types/invoice-input";

interface InvoiceFormProps {
  readonly invoice?: Invoice;
  readonly onSave: (data: InvoiceInput) => Promise<void>;
  readonly onCancel: () => void;
  readonly loading?: boolean;
}

export default function InvoiceForm({
  invoice,
  onSave,
  onCancel,
  loading = false,
}: Readonly<InvoiceFormProps>) {
  const {
    formData,
    errors,
    submitError,
    handleSubmit,
    handleInputChange,
    setSubmitError,
  } = useInvoiceForm({ invoice, onSave });
  const isEdit = !!invoice;

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
                  error={!!errors.title}
                  helperText={errors.title}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={formData.customer}
                  onChange={handleInputChange("customer")}
                  error={!!errors.customer}
                  helperText={errors.customer}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange("amount")}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <SaveIcon />
                    }
                    disabled={loading}
                  >
                    {(() => {
                      if (loading) return "Saving...";
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
