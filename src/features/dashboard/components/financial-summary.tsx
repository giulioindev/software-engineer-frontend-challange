import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";
import { formatCurrency } from "@/utils";

export default function FinancialSummary({
  stats,
}: Readonly<{ stats: DashboardStats }>) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Financial Summary
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography>Total Revenue:</Typography>
              <Typography variant="h6" color="success.main">
                {formatCurrency(stats.totalRevenue)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography>Average Invoice Value:</Typography>
              <Typography variant="h6">
                {formatCurrency(stats.averageInvoiceValue)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography>Paid vs Total:</Typography>
              <Typography variant="h6">
                {stats.paidInvoices} / {stats.totalInvoices}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
