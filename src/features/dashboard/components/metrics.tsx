import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";
import { formatCurrency } from "@/utils";

export default function Metrics({
  stats,
}: Readonly<{ stats: DashboardStats }>) {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Total Invoices
                </Typography>
                <Typography variant="h4">{stats.totalInvoices}</Typography>
              </Box>
              <ReceiptIcon color="primary" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Total Revenue
                </Typography>
                <Typography variant="h4" color="success.main">
                  {formatCurrency(stats.totalRevenue)}
                </Typography>
              </Box>
              <AttachMoneyIcon color="success" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Paid Invoices
                </Typography>
                <Typography variant="h4" color="success.main">
                  {stats.paidInvoices}
                </Typography>
              </Box>
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Pending Invoices
                </Typography>
                <Typography variant="h4" color="warning.main">
                  {stats.pendingInvoices}
                </Typography>
              </Box>
              <SendIcon color="warning" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
