import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { UserContext } from '../../contexts/UserContext';

const Sales = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [sales, setSales] = useState([]);
    console.log(useContext(UserContext));
    const { user, sessionToken } = useContext(UserContext);

    useEffect(() => {
        axios({
            method: 'get',
            headers: {
                "Authorization": `Bearer ${sessionToken}`
            },
            url: `https://umbrella.rest.ghlmanager.com/sales`
        })
            .then(function (response) {
                const salesData = response.data.sales;
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
                />

            </Box>
        </Box>
    );
};

export default Sales;
