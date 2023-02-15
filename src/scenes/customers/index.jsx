import { useState, useEffect} from 'react';
import axios from 'axios';

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [row_state, setRow_state] = useState(mockDataContacts);
  
  let cust_data= [];
  let row_data = [];

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3003/customerInit'
    })
      .then(function (response) {
        //tran_data = JSON.stringify(response.data);
        cust_data = Object.values(response.data);
        cust_data.forEach((value, index) => {
          row_data[index] = {};
          row_data[index].id = cust_data[index].id;
          row_data[index].firstName = cust_data[index].firstName;
          row_data[index].lastName = cust_data[index].lastName;
          row_data[index].email = cust_data[index].email;
          row_data[index].phone = cust_data[index].phone;
          row_data[index].dateCleared = cust_data[index].dateCleared;
          row_data[index].companyName = cust_data[index].companyName;
          row_data[index].timezone = cust_data[index].timezone;
          row_data[index].locationId = cust_data[index].locationId;
          row_data[index].dnc = cust_data[index].dnc;
          row_data[index].type = cust_data[index].type;
          row_data[index].source = cust_data[index].source;
          row_data[index].assignedUserId = cust_data[index].assignedUserId;
          row_data[index].addressId = cust_data[index].addressId;
          row_data[index].website = cust_data[index].website;
          row_data[index].dateOfBirth = cust_data[index].dateOfBirth;
          row_data[index].dateAdded = cust_data[index].dateAdded;
          row_data[index].dateUpdated = cust_data[index].dateUpdated;
          row_data[index].ssn = cust_data[index].ssn;
          row_data[index].gender = cust_data[index].gender;
          row_data[index].keyword = cust_data[index].keyword;
          row_data[index].dateLastActivity = cust_data[index].dateLastActivity;
          row_data[index].umbrellaUserId = cust_data[index].umbrellaUserId;
          console.log(index , row_data);
          //console.log(mockDataInvoices);
          setRow_state(row_data);
        });
        
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const columns = [   
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "firstName", headerName: "firstName" },
    { field: "lastName", headerName: "lastName" },
    { field: "email", headerName: "email" },
    { field: "phone", headerName: "phone" },
    { field: "companyName", headerName: "companyName" },
    { field: "timezone", headerName: "timezone" },
    { field: "locationId", headerName: "locationId" },
    { field: "dnc", headerName: "dnc" },
    { field: "type", headerName: "type" },
    { field: "source", headerName: "source" },
    { field: "assignedUserId", headerName: "assignedUserId" },
    { field: "addressId", headerName: "addressId" },
    { field: "website", headerName: "website" },
    { field: "dateOfBirth", headerName: "dateOfBirth" },    
    { field: "dateAdded", headerName: "dateAdded" },
    { field: "dateUpdated", headerName: "dateUpdated" },
    { field: "ssn", headerName: "ssn" },
    { field: "gender", headerName: "gender" },
    { field: "keyword", headerName: "keyword" },
    { field: "dateLastActivity", headerName: "dateLastActivity" },
    { field: "umbrellaUserId", headerName: "umbrellaUserId" },
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
          rows={row_state}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
