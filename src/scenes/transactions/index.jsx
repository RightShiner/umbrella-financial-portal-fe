import { useState, useEffect} from 'react';
import axios from 'axios';

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [row_state, setRow_state] = useState(mockDataInvoices);
  
  let tran_data= [];
  let row_data = [];

  useEffect(() => {
        axios({
      method: 'post',
      url: 'http://localhost:3003/tranInit'
    })
      .then(function (response) {
        //tran_data = JSON.stringify(response.data);
        tran_data = Object.values(response.data);
        tran_data.forEach((value, index) => {
          row_data[index] = {};
          row_data[index].id = tran_data[index].id;
          row_data[index].name = tran_data[index].name;
          row_data[index].description = tran_data[index].description;
          row_data[index].amount = tran_data[index].amount;
          row_data[index].dateCreated = tran_data[index].dateCreated;
          row_data[index].dateCleared = tran_data[index].dateCleared;
          row_data[index].accountId = tran_data[index].accountId;
          row_data[index].accountName = tran_data[index].account.name;
          row_data[index].accountBalance = tran_data[index].account.balance;
          row_data[index].accountUserId = tran_data[index].account.userId;
          row_data[index].commissionId = tran_data[index].commissionId;
          row_data[index].commissionUserId = tran_data[index].commission.userId;
          row_data[index].commissionProductId = tran_data[index].commission.productId;
          row_data[index].purchaseId = tran_data[index].purchaseId;
          row_data[index].purchaseUserId = tran_data[index].purchase.userId;
          row_data[index].purchaseProductId = tran_data[index].purchase.productId;
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
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "name",
      
    },
    {
      field: "description",
      headerName: "description",
      
    },
    {
      field: "amount",
      headerName: "amount",
      
    },
    {
      field: "dateCreated",
      headerName: "dateCreated",
      
    },
    {
      field: "dateCleared",
      headerName: "dateCleared",
      
    },
    {
      field: "purchaseId",
      headerName: "purchaseId",
      
    },
    {
      field: "purchaseUserId",
      headerName: "purchaseUserId",
      
    },
    {
      field: "purchaseProductId",
      headerName: "purchaseProductId",
      
    },
    {
      field: "commissionId",
      headerName: "commissionId",
      
    },
    {
      field: "commissionUserId",
      headerName: "commissionUserId",
      
    },
    {
      field: "commissionProductId",
      headerName: "commissionProductId",
      
    },
    {
      field: "accountId",
      headerName: "accountId",
      
    },
    {
      field: "accountName",
      headerName: "accountName",
      
    },
    {
      field: "accountBalance",
      headerName: "accountBalance",
      
    },
    {
      field: "accountUserId",
      headerName: "accountUserId",
    }
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >        
        <DataGrid
          checkboxSelection
          rows={row_state}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />

      </Box>
    </Box>
  );
};

export default Transactions;
