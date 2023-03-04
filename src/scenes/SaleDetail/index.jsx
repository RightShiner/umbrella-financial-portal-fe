import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import Item from "@mui/material/Item";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { UserContext } from "../../contexts/UserContext";
import { SaleContext } from "../../contexts/SaleContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SaleDetail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sales, setSales] = useState([]);
  const [sellingUser, setSellingUser] = useState([]);
  const [purchasingUser, setPurchasingUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [commissionPlan, setCommissionPlan] = useState([]);
  const { user, sessionToken, saletemp } = useContext(UserContext);

  useEffect(() => {
    setSales([saletemp]);
    setSellingUser([saletemp.sellingUser]);
    setPurchasingUser([saletemp.purchasingUser]);
    setProduct([saletemp.product]);
    setCommissionPlan([saletemp.commissionPlan]);
    console.log(sellingUser);
    // setSales([
    //   {
    //     id: "1",
    //     purchasePrice: "5000",
    //     sellingUserName: "1",
    //     purchasingUserName: "customer",
    //   },
    // ]);
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
      <Header
        title="Detailed User Information"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse"
      />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            User Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">sellingUserId</TableCell>
                    <TableCell align="right">purchasingUserId</TableCell>
                    <TableCell align="right">productId</TableCell>
                    <TableCell align="right">purchasePrice</TableCell>
                    <TableCell align="right">trialStartDate</TableCell>
                    <TableCell align="right">billingStartDate</TableCell>
                    <TableCell align="right">dateCreated</TableCell>
                    <TableCell align="right">dateUpdated</TableCell>
                    <TableCell align="right">dateCancelled</TableCell>
                    <TableCell align="right">commissionPlanId</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.sellingUserId}</TableCell>
                      <TableCell align="right">
                        {row.purchasingUserId}
                      </TableCell>
                      <TableCell align="right">{row.productId}</TableCell>
                      <TableCell align="right">{row.purchasePrice}</TableCell>
                      <TableCell align="right">{row.trialStartDate}</TableCell>
                      <TableCell align="right">
                        {row.billingStartDate}
                      </TableCell>
                      <TableCell align="right">{row.dateCreated}</TableCell>
                      <TableCell align="right">{row.dateUpdated}</TableCell>
                      <TableCell align="right">{row.dateCancelled}</TableCell>
                      <TableCell align="right">
                        {row.commissionPlanId}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            SellingUser Infomation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">uigUserId</TableCell>
                    <TableCell align="right">type</TableCell>
                    <TableCell align="right">role</TableCell>
                    <TableCell align="right">hashPassword</TableCell>
                    <TableCell align="right">level1ReferredByUserId</TableCell>
                    <TableCell align="right">level2ReferredByUserId</TableCell>
                    <TableCell align="right">level3ReferredByUserId</TableCell>
                    <TableCell align="right">affiliateStatus</TableCell>
                    <TableCell align="right">affiliateUrl</TableCell>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">phoneNumber</TableCell>
                    <TableCell align="right">username</TableCell>
                    <TableCell align="right">dateOfBirth</TableCell>
                    <TableCell align="right">primaryGhlLocationId</TableCell>
                    <TableCell align="right">ghlUserId</TableCell>
                    <TableCell align="right">
                      ghlSuperCorporateContactId
                    </TableCell>
                    <TableCell align="right">salesAccountId</TableCell>
                    <TableCell align="right">dateCreated</TableCell>
                    <TableCell align="right">dateUpdated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sellingUser.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.uigUserId}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.hashPassword}</TableCell>
                      <TableCell align="right">
                        {row.level1ReferredByUserId}
                      </TableCell>
                      <TableCell align="right">
                        {row.level2ReferredByUserId}
                      </TableCell>
                      <TableCell align="right">
                        {row.level3ReferredByUserId}
                      </TableCell>
                      <TableCell align="right">{row.affiliateStatus}</TableCell>
                      <TableCell align="right">{row.affiliateUrl}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phoneNumber}</TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.dateOfBirth}</TableCell>
                      <TableCell align="right">
                        {row.primaryGhlLocationId}
                      </TableCell>
                      <TableCell align="right">{row.ghlUserId}</TableCell>
                      <TableCell align="right">
                        {row.ghlSuperCorporateContactId}
                      </TableCell>
                      <TableCell align="right">{row.salesAccountId}</TableCell>
                      <TableCell align="right">{row.dateCreated}</TableCell>
                      <TableCell align="right">{row.dateUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            PurchasingUser Infomation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">uigUserId</TableCell>
                    <TableCell align="right">type</TableCell>
                    <TableCell align="right">role</TableCell>
                    <TableCell align="right">hashPassword</TableCell>
                    <TableCell align="right">level1ReferredByUserId</TableCell>
                    <TableCell align="right">level2ReferredByUserId</TableCell>
                    <TableCell align="right">level3ReferredByUserId</TableCell>
                    <TableCell align="right">affiliateStatus</TableCell>
                    <TableCell align="right">affiliateUrl</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">phoneNumber</TableCell>
                    <TableCell align="right">username</TableCell>
                    <TableCell align="right">dateOfBirth</TableCell>
                    <TableCell align="right">primaryGhlLocationId</TableCell>
                    <TableCell align="right">ghlUserId</TableCell>
                    <TableCell align="right">
                      ghlSuperCorporateContactId
                    </TableCell>
                    <TableCell align="right">salesAccountId</TableCell>
                    <TableCell align="right">dateCreated</TableCell>
                    <TableCell align="right">dateUpdated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchasingUser.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.uigUserId}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.hashPassword}</TableCell>
                      <TableCell align="right">
                        {row.level1ReferredByUserId}
                      </TableCell>
                      <TableCell align="right">
                        {row.level2ReferredByUserId}
                      </TableCell>
                      <TableCell align="right">
                        {row.level3ReferredByUserId}
                      </TableCell>
                      <TableCell align="right">{row.affiliateStatus}</TableCell>
                      <TableCell align="right">{row.affiliateUrl}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phoneNumber}</TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.dateOfBirth}</TableCell>
                      <TableCell align="right">
                        {row.primaryGhlLocationId}
                      </TableCell>
                      <TableCell align="right">{row.ghlUserId}</TableCell>
                      <TableCell align="right">
                        {row.ghlSuperCorporateContactId}
                      </TableCell>
                      <TableCell align="right">{row.salesAccountId}</TableCell>
                      <TableCell align="right">{row.dateCreated}</TableCell>
                      <TableCell align="right">{row.dateUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Product Infomation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">isRecurring</TableCell>
                    <TableCell align="right">billingPeriodLength</TableCell>
                    <TableCell align="right">billingPeriodUnit</TableCell>
                    <TableCell align="right">trialPeriodLength</TableCell>
                    <TableCell align="right">trialPeriodUnit</TableCell>
                    <TableCell align="right">retailPrice</TableCell>
                    <TableCell align="right">costAmount</TableCell>
                    <TableCell align="right">dateCreated</TableCell>
                    <TableCell align="right">dateUpdated</TableCell>
                    <TableCell align="right">dateRetired</TableCell>
                    <TableCell align="right">defaultCommissionPlanId</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.isRecurring}</TableCell>
                      <TableCell align="right">
                        {row.billingPeriodLength}
                      </TableCell>
                      <TableCell align="right">
                        {row.billingPeriodUnit}
                      </TableCell>
                      <TableCell align="right">
                        {row.trialPeriodLength}
                      </TableCell>
                      <TableCell align="right">{row.trialPeriodUnit}</TableCell>
                      <TableCell align="right">{row.retailPrice}</TableCell>
                      <TableCell align="right">{row.costAmount}</TableCell>
                      <TableCell align="right">{row.dateCreated}</TableCell>
                      <TableCell align="right">{row.dateUpdated}</TableCell>
                      <TableCell align="right">{row.dateRetired}</TableCell>
                      <TableCell align="right">
                        {row.defaultCommissionPlanId}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            CommissionPlan Infomation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">
                      commissionableValueShare
                    </TableCell>
                    <TableCell align="right">personalSaleShare</TableCell>
                    <TableCell align="right">
                      corporatePartnerProfitShare
                    </TableCell>
                    <TableCell align="right">level1ReferralShare</TableCell>
                    <TableCell align="right">level2ReferralShare</TableCell>
                    <TableCell align="right">level3ReferralShare</TableCell>
                    <TableCell align="right">dateCreated</TableCell>
                    <TableCell align="right">dateUpdated</TableCell>
                    <TableCell align="right">dateRetired</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commissionPlan.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.isRecurring}</TableCell>
                      <TableCell align="right">
                        {row.billingPeriodLength}
                      </TableCell>
                      <TableCell align="right">
                        {row.billingPeriodUnit}
                      </TableCell>
                      <TableCell align="right">
                        {row.trialPeriodLength}
                      </TableCell>
                      <TableCell align="right">{row.trialPeriodUnit}</TableCell>
                      <TableCell align="right">{row.retailPrice}</TableCell>
                      <TableCell align="right">{row.costAmount}</TableCell>
                      <TableCell align="right">{row.dateCreated}</TableCell>
                      <TableCell align="right">{row.dateUpdated}</TableCell>
                      <TableCell align="right">{row.dateRetired}</TableCell>
                      <TableCell align="right">
                        {row.defaultCommissionPlanId}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SaleDetail;
