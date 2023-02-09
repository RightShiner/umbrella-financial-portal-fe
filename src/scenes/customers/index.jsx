import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const columns = [   
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "affiliate_plan", headerName: "Affiliate Plan" },
    { field: "affiliate_plan_purchase_date", headerName: "Affiliate Plan Purchase Date" },
    { field: "affiliate_referral_id", headerName: "Affiliate Referral Id" },
    { field: "affiliate_referral_link", headerName: "Affiliate Referral Link" },
    { field: "affiliate_referral_name", headerName: "Affiliate Referral Name" },
    { field: "affiliate_referral_plan", headerName: "Affiliate Referral Plan" },
    { field: "affiliate_referral_user_id", headerName: "Affiliate Referral User Id" },
    { field: "affiliate_status", headerName: "Affiliate Status" },
    { field: "affiliate_url", headerName: "Affiliate Url" },
    { field: "coach_id", headerName: "Coach Id" },
    { field: "coach_name", headerName: "Coach Name" },
    { field: "coach_user_id", headerName: "Coach User Id" },
    { field: "customer_plan", headerName: "Customer Plan" },
    { field: "customer_plan_purchase_date", headerName: "Customer Plan Purchase Date" },    
    { field: "customer_status", headerName: "Customer Status" },
    { field: "email", headerName: "email" },
    { field: "has_coach_tier", headerName: "Has Coach Tier" },
    { field: "has_mentor_tier", headerName: "Has Mentor Tier" },
    { field: "has_partner_tier", headerName: "Has Partner Tier" },
    { field: "mentor_id", headerName: "Mentor Id" },
    { field: "mentor_name", headerName: "Mentor Name" },
    { field: "mentor_user_id", headerName: "Mentor User Id" },
    { field: "name", headerName: "name" },
    { field: "partner_id", headerName: "partner_id" },
    { field: "partner_name", headerName: "partner_name" },
    { field: "partner_user_id", headerName: "partner_user_id" },
    { field: "phone_number", headerName: "phone_number" },
    { field: "referred_by_affiliate", headerName: "referred_by_affiliate" },
    { field: "transaction_total", headerName: "transaction_total" },
    { field: "primary_ghl_location_id", headerName: "primary_ghl_location_id" },
    { field: "primary_ghl_location_api_key", headerName: "primary_ghl_location_api_key" },    
    { field: "ghl_user_id", headerName: "ghl_user_id" },
    { field: "ghl_location_ids", headerName: "ghl_location_ids" },
    { field: "ghl_super_corporate_contact_id", headerName: "ghl_super_corporate_contact_id" },
    { field: "date_of_birth", headerName: "date_of_birth" },
    { field: "username", headerName: "username" },
  ];

  return (
    <Box m="20px">
      <Header
        title="CUSTOMERS"
        subtitle=""
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
