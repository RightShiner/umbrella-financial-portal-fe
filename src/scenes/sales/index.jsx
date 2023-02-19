import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";

const Sales = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sales, setSales] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log(useContext(UserContext));
  const { user, sessionToken } = useContext(UserContext);

  useEffect(() => {
    console.log(sessionToken);
    axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      url: `https://umbrella.rest.ghlmanager.com/sales`,
    })
      .then(function (response) {
        const salesData = response.data.sales;
        console.log(response);
        for (const [index, sale] of salesData.entries()) {
          sale.sellingUserName = sale.sellingUser.name;
          sale.purchasingUserName = sale.purchasingUser.name;
          sale.purchasePrice = Number(sale.purchasePrice);
        }
        setSales(salesData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setSales([
      {
        id: user.id,
        purchasePrice: "sales.sellingUserName",
        sellingUserName: "sales.purchasingUserName",
        purchasingUserName: "sales.purchasePrice",
      },
    ]);
  }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    const purchasePrice = params.row.purchasePrice;
    const sellingUserName = params.row.sellingUserName;
    const purchasingUserName = params.row.purchasingUserName;

    setSelectedRow({ id, purchasePrice, sellingUserName, purchasingUserName });
    // console.log(selectedRow);
    // navigate(`/sales/id?${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID" },
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
  ];

  return (
    <Box m="20px">
      <Header title="SALES" subtitle="" />
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
          rows={sales}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default Sales;
