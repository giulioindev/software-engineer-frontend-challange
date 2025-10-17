"use client";

import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import FinancialSummary from "@/features/dashboard/components/financial-summary";
import Metrics from "@/features/dashboard/components/metrics";
import RecentInvoices from "@/features/dashboard/components/recent-invoices";
import StatusDistribution from "@/features/dashboard/components/status-distribution";
import { useStats } from "@/features/dashboard/hooks/use-stats";

export default function DashboardPage() {
  const { stats, isLoading, isError } = useStats();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" onClose={() => {}}>
        {"Failed to load dashboard data"}
      </Alert>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Invoice Management Insights
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Metrics stats={stats} />
        <StatusDistribution stats={stats} />
        <FinancialSummary stats={stats} />
        <RecentInvoices stats={stats} />
      </Grid>
    </Box>
  );
}
