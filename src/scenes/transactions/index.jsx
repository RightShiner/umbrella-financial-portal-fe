import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "affiliate_plan",
      headerName: "Affiliate Plane",
      
    },
    {
      field: "affiliate_plan_purchase_date",
      headerName: "Affiliate Plan Purchase Date",
      
    },
    {
      field: "affiliate_referral_id",
      headerName: "Affiliate Referral Id",
      
    },
    {
      field: "affiliate_referral_link",
      headerName: "Affiliate Referral Link",
      
    },
    {
      field: "affiliate_referral_name",
      headerName: "Affiliate Referral Name",
      
    },
    {
      field: "affiliate_referral_plan",
      headerName: "Affiliate Referral Plan",
      
    },
    {
      field: "affiliate_referral_user_id",
      headerName: "Affiliate Referral User Id",
      
    },
    {
      field: "affiliate_status",
      headerName: "Affiliate Status",
      
    },
    {
      field: "affiliate_url",
      headerName: "Affiliate Url",
      
    },
    {
      field: "coach_id",
      headerName: "Coach Id",
      
    },
    {
      field: "coach_name",
      headerName: "Coach Name",
      
    },
    {
      field: "coach_user_id",
      headerName: "Coach User Id",
      
    },
    {
      field: "customer_plan",
      headerName: "Customer Plan",
      
    },
    {
      field: "customer_plan_purchase_date",
      headerName: "Customer Plan Purchase Date",
      
    },
    {
      field: "customer_status",
      headerName: "Customer Status",
      
    },
    {
      field: "email1",      
      headerName: "email1",
      
    },
    {
      field: "has_coach_tier",      
      headerName: "Has Coach Tier",
      
    },
    {
      field: "has_partner_tier",      
      headerName: "Has Partner Tier",
      
    },
    {
      field: "mentor_id",      
      headerName: "Mentor Id",
      
    },
    {
      field: "mentor_name",      
      headerName: "Mentor name",
      
    },
    {
      field: "mentor_user_id",      
      headerName: "Mentor User Id",
      
    },
    {
      field: "name1",
      headerName: "name1",
      
    },
    {
      field: "partner_id",
      headerName: "Partner Id",
      
    },
    {
      field: "partner_name",
      headerName: "Partner Name",
      
    },
    {
      field: "partner_user_id",
      headerName: "Partner User Id",
      
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      
    },
    {
      field: "referred_by_affiliate",
      headerName: "Referred By Affiliate",
      
    },
    {
      field: "transaction_total",
      headerName: "Transaction Total",
      
    },
    {
      field: "user_id",
      headerName: "User Id",
      
    },
    
  ];

  return (
    <Box m="20px">
      <Header title="TRANSACTIONS" subtitle="" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Transactions;
