import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";

export default function StatusDistribution({
  stats,
}: Readonly<{ stats: DashboardStats }>) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Invoice Status Distribution
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography>Paid</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6">{stats.paidInvoices}</Typography>
                <Chip
                  label={`${Math.round((stats.paidInvoices / stats.totalInvoices) * 100)}%`}
                  color="success"
                  size="small"
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <SendIcon color="warning" />
                <Typography>Sent</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6">{stats.pendingInvoices}</Typography>
                <Chip
                  label={`${Math.round((stats.pendingInvoices / stats.totalInvoices) * 100)}%`}
                  color="warning"
                  size="small"
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <EditIcon color="primary" />
                <Typography>Draft</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6">{stats.draftInvoices}</Typography>
                <Chip
                  label={`${Math.round((stats.draftInvoices / stats.totalInvoices) * 100)}%`}
                  color="primary"
                  size="small"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
