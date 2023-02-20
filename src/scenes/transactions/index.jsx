import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";

const Transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [row_state, setRow_state] = useState([]);
  console.log(useContext(UserContext));
  const { user, sessionToken } = useContext(UserContext);

  let tran_data = [];
  let row_data = [];

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      url: `https://umbrella.rest.ghlmanager.com/sales`,
    })
      .then(function (response) {
        tran_data = response.data.sales;
        console.log(tran_data);
        row_data = new Array(tran_data.length);
        for (const [index, transaction] of tran_data.entries()) {
          console.log(transaction);
          row_data[index] = {};
          for (const [key, value] of Object.entries(transaction)) {
            console.log(row_data);
            console.log(index);
            console.log(transaction);
            console.log(value);
            row_data[index][key] = value;
          }
          console.log(row_data);
          setRow_state(row_data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    /*{
      field: "name",
      headerName: "name",
  
    },
    {
      field: "description",
      headerName: "description",
  
    },*/
    {
      field: "purchasePrice",
      headerName: "amount",
    },
    {
      field: "dateCreated",
      headerName: "dateCreated",
    } /*
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
    }*/,
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
