import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";

const Sales = ({ setSaletemp }) => {
  const { user, sessionToken, saletemp } = useContext(UserContext);
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sales, setSales] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://umbrella.rest.ghlmanager.com/sales`,
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then(function (response) {
        const salesData = response.data.sales;
        console.log(response);
        for (const [index, sale] of salesData.entries()) {
          sale.sellingUserName = sale.sellingUser.name;
          sale.purchasingUserName = sale.purchasingUser.name;
          sale.purchasePrice = Number(sale.purchasePrice);
          sale.productName = sale.product.name;
          sale.dateCreated = new Date(sale.dateCreated);
        }
        setSales(salesData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  //   useEffect(() => {
  //     setSales([
  //       {
  //         id: "1",
  //         purchasePrice: "5000",
  //         sellingUserName: "ddd",
  //         purchasingUserName: "ddd",
  //       },
  //     ]);
  //   }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    const purchasePrice = params.row.purchasePrice;
    const sellingUserName = params.row.sellingUserName;
    const purchasingUserName = params.row.purchasingUserName;

    setSelectedRow({ id, purchasePrice, sellingUserName, purchasingUserName });
    // console.log(selectedRow);
    // navigate(`/sales/${id}`);

    const pushData = async () => {
      axios({
        method: "get",
        url: `https://umbrella.rest.ghlmanager.com/sales/${id}`,
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
        .then(function (response) {
          console.log(response.data.sale);
          setSaletemp(response.data.sale);
          console.log(saletemp);
          navigate("/detail");
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    pushData();
    // setSaletemp({
    //   id: "027afb95-2d5a-4189-b73b-77a159b8ef71",
    //   sellingUserId: "3f638d14-2efa-40ab-ae4e-3351e70ff704",
    //   purchasingUserId: "80829dac-aa5f-4b71-82e0-3f94b0113728",
    //   productId: "5092bc95-cba6-4cb4-8593-aa1fe96825e8",
    //   purchasePrice: "700",
    //   trialStartDate: null,
    //   billingStartDate: null,
    //   dateCreated: "2023-02-18T04:13:42.409Z",
    //   dateUpdated: "2023-02-18T04:13:42.409Z",
    //   dateCancelled: null,
    //   commissionPlanId: "e3e334a9-c483-4ce9-b840-b188046fb9fb",
    //   sellingUser: {
    //     id: "3f638d14-2efa-40ab-ae4e-3351e70ff704",
    //     uigUserId: null,
    //     type: "AFFILIATE",
    //     role: "USER",
    //     hashPassword:
    //       "$2b$14$qZ9VBo.J48SiPq19fhLwke4Cx/.OUjLqiENKlErskxsA5Rw/.4y/W",
    //     level1ReferredByUserId: null,
    //     level2ReferredByUserId: null,
    //     level3ReferredByUserId: null,
    //     affiliateStatus: null,
    //     affiliateUrl: null,
    //     name: "DENNISE RAMBERANSING",
    //     email: null,
    //     phoneNumber: null,
    //     username: null,
    //     dateOfBirth: null,
    //     primaryGhlLocationId: null,
    //     ghlUserId: null,
    //     ghlSuperCorporateContactId: null,
    //     salesAccountId: null,
    //     dateCreated: "2023-02-18T04:13:42.409Z",
    //     dateUpdated: "2023-02-18T04:13:42.409Z",
    //   },
    //   purchasingUser: {
    //     id: "80829dac-aa5f-4b71-82e0-3f94b0113728",
    //     uigUserId: null,
    //     type: "CUSTOMER",
    //     role: "USER",
    //     hashPassword:
    //       "$2b$14$qZ9VBo.J48SiPq19fhLwke4Cx/.OUjLqiENKlErskxsA5Rw/.4y/W",
    //     level1ReferredByUserId: null,
    //     level2ReferredByUserId: null,
    //     level3ReferredByUserId: null,
    //     affiliateStatus: null,
    //     affiliateUrl: null,
    //     name: "DENNIS RAMBERANSINGH",
    //     email: null,
    //     phoneNumber: null,
    //     username: null,
    //     dateOfBirth: null,
    //     primaryGhlLocationId: null,
    //     ghlUserId: null,
    //     ghlSuperCorporateContactId: null,
    //     salesAccountId: null,
    //     dateCreated: "2023-02-18T04:13:42.409Z",
    //     dateUpdated: "2023-02-18T04:13:42.409Z",
    //   },
    //   product: {
    //     id: "5092bc95-cba6-4cb4-8593-aa1fe96825e8",
    //     name: "Taxes level 1",
    //     isRecurring: false,
    //     billingPeriodLength: null,
    //     billingPeriodUnit: null,
    //     trialPeriodLength: null,
    //     trialPeriodUnit: null,
    //     retailPrice: "500",
    //     costAmount: "150",
    //     dateCreated: "2023-02-18T04:13:07.050Z",
    //     dateUpdated: "2023-02-18T04:13:07.050Z",
    //     dateRetired: null,
    //     defaultCommissionPlanId: "e3e334a9-c483-4ce9-b840-b188046fb9fb",
    //   },
    //   commissionPlan: {
    //     id: "e3e334a9-c483-4ce9-b840-b188046fb9fb",
    //     name: "Fixed Fee Standard Commission Plan",
    //     commissionableValueShare: "1",
    //     personalSaleShare: "0.3",
    //     corporatePartnerProfitShare: "0.4",
    //     level1ReferralShare: "0.1",
    //     level2ReferralShare: "0.05",
    //     level3ReferralShare: "0.03",
    //     dateCreated: "2023-02-18T04:13:06.645Z",
    //     dateUpdated: "2023-02-18T04:13:06.645Z",
    //     dateRetired: null,
    //   },
    // });
    // console.log(saletemp);
    // navigate("/detail");
  };

  //   useEffect(() => {
  //     navigate("/detail");
  //   }, [Saletemp]);

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
