"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Invoice } from "@/features/invoices/types/invoice";
import { formatCurrency, formatDate, getStatusColor } from "@/utils";

interface InvoiceDetailsProps {
  readonly invoice: Invoice;
}

export default function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  const router = useRouter();

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back to Invoices
        </Button>
        <Typography variant="h4" component="h1">
          Invoice Details
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={3}
              >
                <Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {invoice.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Invoice ID: {invoice.id}
                  </Typography>
                </Box>
                <Chip
                  label={invoice.status.toUpperCase()}
                  color={getStatusColor(invoice.status)}
                  size="medium"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Customer Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {invoice.customer}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Invoice Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatDate(invoice.date)}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Amount
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {formatCurrency(invoice.amount)}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Status
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href={`/invoices/${invoice.id}/edit`}>
                <Button variant="contained" startIcon={<EditIcon />} fullWidth>
                  Edit Invoice
                </Button>
              </Link>
              <Link href={"/invoices"}>
                <Button variant="outlined" fullWidth>
                  Back to List
                </Button>
              </Link>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Invoice Summary
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Subtotal:</Typography>
              <Typography variant="body2">
                {formatCurrency(invoice.amount)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Tax (0%):</Typography>
              <Typography variant="body2">$0.00</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                {formatCurrency(invoice.amount)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
