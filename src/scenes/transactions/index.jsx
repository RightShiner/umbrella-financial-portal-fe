import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";

const Transactions = ({ setSelectedTransaction }) => {
  const { user, sessionToken, saletemp } = useContext(UserContext);
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://umbrella.rest.ghlmanager.com/transactions`,
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then(function (response) {
        const transactionData = response.data.transactions;
        console.log(response);
        for (const [index, transaction] of transactionData.entries()) {
          transaction.amount = Number(transaction.amount);
          transaction.sellingUserName = transaction.sale.sellingUser.name;
          transaction.purchasingUserName = transaction.sale.purchasingUser.name;
          transaction.purchasePrice = Number(transaction.sale.purchasePrice);
          transaction.productName = transaction.sale.product.name;
          transaction.dateCreated = new Date(transaction.dateCreated);
        }
        setTransactions(transactionData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "amount", headerName: "Amount"
    },
    {
      field: "name", headerName: "Name"
    },
    {
      field: "description", headerName: "Description"
    },
    {
      field: "purchasePrice",
      headerName: "Purchase Price",
    },
    {
      field: "sellingUserName",
      headerName: "Selling User",
    },
    {
      field: "purchasingUserName",
      headerName: "Customer",
    },
    {
      field: "productName",
      headerName: "Product"
    },
    {
      field: "dateCreated",
      headerName: "Date"
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
          rows={transactions}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
