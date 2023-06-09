import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ForestIcon from "@mui/icons-material/Forest";
import FortIcon from "@mui/icons-material/Fort";
import GamesIcon from "@mui/icons-material/Games";
import GrassIcon from "@mui/icons-material/Grass";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HubIcon from "@mui/icons-material/Hub";
import TrafficIcon from "@mui/icons-material/Traffic";

import { tokens } from "../../theme";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import TopsalesBox from "../../components/TopsalesBox";
import ProgressCircle from "../../components/ProgressCircle";

import { mockTransactions } from "../../data/mockData";
import {
  getCommissionData,
  getRevenueTimeSeriesData,
  getSalesLeaderboard,
  getTransactionsTimeSeriesData,
} from "../../services/dashboard";
import { UserContext } from "../../contexts/UserContext";

//datepicker
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//grid
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

//select Field
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment/moment";
const transactionFieldMap = new Map([
  ["amount", "amount"],
  ["dateCreated", "sale.dateCreated"],
]);
const saleFieldMap = new Map([
  ["amount", "purchasePrice"],
  ["dateCreated", "dateCreated"],
]);
const mapTransactionFilter = (field, operator, value, filter = {}) => {
  field = transactionFieldMap.get(field);
  if (field == null) return;
  let subfields = [];
  if (field.includes(".")) {
    subfields = field.split(".");
    subfields.splice(0, 1);
    field = subfields[0];
  }
  filter[field] = {};
  let fieldReference = filter[field];
  for (const subfield of subfields) {
    console.log(fieldReference);
    if (fieldReference[subfield] == null) {
      fieldReference[subfield] = {};
    }
    fieldReference = fieldReference[subfield];
  }
  if (value.type === "DateRange") {
    fieldReference = {
      gte: new Date(value.startDate),
      lte: new Date(value.endDate),
    };
  } else if (typeof value === "string" || typeof value === "number") {
    fieldReference = {};
    filter[field][operator] = value;
  }
  return filter;
};
const mapSaleFilter = (field, operator, value, filter = {}) => {
  field = saleFieldMap.get(field);
  if (field == null) return;

  if (value.type === "DateRange") {
    filter[field] = {
      gte: new Date(value.startDate),
      lte: new Date(value.endDate),
    };
  } else if (typeof value === "string" || typeof value === "number") {
    filter[field] = {};
    filter[field][operator] = value;
  }
  return filter;
};
const mapFilters = (field, operator, value, filters = {}) => {
  filters.transaction = mapTransactionFilter(
    field,
    operator,
    value,
    filters.transaction
  );
  filters.sale = mapSaleFilter(field, operator, value, filters.transaction);
  return filters;
};
const Dashboard = () => {
  const { user, sessionToken, saletemp } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [commissionStatistics, setCommissionStatistics] = useState({});
  const [revenueTimeSeriesData, setRevenueTimeSeriesData] = useState([]);
  const [transactionsTimeSeriesData, setTransactionsTimeSeriesData] = useState(
    []
  );
  const [usersForLeaderboards, setUsersForLeaderboards] = useState([]);

  //select Field
  const [filterField, setFilterField] = useState("");
  const handleChangeFilterField = (event) => {
    setFilterField(event.target.value);
  };

  const [filterOperator, setFilterOperator] = useState("");

  const [filterValue, setFilterValue] = useState("");

  const handleChangeFilterOperator = (event) => {
    setFilterOperator(event.target.value);
  };

  useEffect(() => {
    console.log("useEffect3");
    async function fetchData() {
      const filters = mapFilters(filterField, filterOperator, filterValue);
      console.log(filters);
      await Promise.all([
        getCommissionData(sessionToken, filters).then((result) =>
          setCommissionStatistics(result)
        ),
        getRevenueTimeSeriesData(sessionToken, filters).then((result) => {
          setRevenueTimeSeriesData(result);
        }),
        getTransactionsTimeSeriesData(sessionToken, filters).then((result) =>
          setTransactionsTimeSeriesData(result)
        ),
        getSalesLeaderboard(sessionToken, filters).then((result) =>
          setUsersForLeaderboards(result)
        ),
      ]);
    }
    fetchData();
  }, [sessionToken, filterField, filterOperator, filterValue]);

  useEffect(() => {
    if (filterField === "dateCreated" && filterOperator === "DateRange") {
      setFilterValue({
        type: "DateRange",
        startDate: new Date(),
        endDate: new Date(),
      });
      setFilterOperator("DateRange");
    }
  }, [filterField, filterOperator]);
  // console.log(`revenue data: ${revenueTimeSeriesData}`);

  console.log(filterField);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* filter */}
      <Box sx={{ background: "#1f2a40" }} mb="20px" p="20px">
        <Header title="" subtitle="Filter" />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            Fields
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={filterField}
                  onChange={handleChangeFilterField}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"dateCreated"}>Date</MenuItem>
                  {/*<MenuItem value={"userId"}>User</MenuItem>
                  <MenuItem value={"productId"}>Product</MenuItem>*/}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            Operator
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={filterOperator}
                  onChange={handleChangeFilterOperator}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {filterField === "dateCreated"
                    ? [<MenuItem value={"DateRange"}>date range</MenuItem>]
                    : [
                        <MenuItem value={"contains"}>contains</MenuItem>,
                        <MenuItem value={"equals"}>equals</MenuItem>,
                        <MenuItem value={"startsWith"}>starts with</MenuItem>,
                        <MenuItem value={"endsWith"}>ends with</MenuItem>,
                      ]}
                  {/*<MenuItem value={5}>is empty</MenuItem>
                  <MenuItem value={6}>is not empty</MenuItem>
                <MenuItem value={7}>is any of</MenuItem>*/}{" "}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            Value
            <div>
              {filterField === "dateCreated" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={filterValue.startDate}
                    onChange={(newValue) => {
                      const tempFilterValue =
                        filterValue == null || typeof filterValue === "string"
                          ? { type: "DateRange" }
                          : Object.assign({}, filterValue);
                      tempFilterValue.startDate = moment(
                        newValue.toDate()
                      ).format("YYYY-MM-DD");
                      console.log(tempFilterValue);
                      setFilterValue(tempFilterValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DatePicker
                    label="End Date"
                    value={filterValue.endDate}
                    onChange={(newValue) => {
                      const tempFilterValue =
                        filterValue == null || typeof filterValue === "string"
                          ? { type: "DateRange" }
                          : Object.assign({}, filterValue);
                      tempFilterValue.endDate = moment(
                        newValue.toDate()
                      ).format("YYYY-MM-DD");
                      console.log(tempFilterValue);
                      setFilterValue(tempFilterValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              ) : (
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
      {/* end of filter */}

      {/* GRID & CHARTS */}

      <Grid container spacing={2}>
        {/* Row1 */}
        <Grid item sm={6} md={6} lg={3}>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.totalCommissionPaid}
              subtitle="Total Commission Due to be paid out based on total sum of transactions"
              progress="0.75"
              increase="+14%"
              icon={
                <ForestIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={3}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.totalCommission}
              subtitle="Total commission Due based on total sum of transactions"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={3}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.averageCommission}
              subtitle="Avg commission amount."
              progress="0.30"
              increase="+5%"
              icon={
                <HubIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={3}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.amountTowardsGoalInProfileSection}
              subtitle="% towards goal that was seet in the profile section"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>

        {/* Row2 */}
        <Grid item sm={6} md={6} lg={3}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.revenue}
              subtitle="aka Revenue"
              progress="0.75"
              increase="+14%"
              icon={
                <FortIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={3}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.saleCount}
              subtitle="aka Sales"
              progress="0.50"
              increase="+21%"
              icon={
                <GamesIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={3}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.delinquents}
              subtitle="aka Delinquents"
              progress="0.30"
              increase="+5%"
              icon={
                <GrassIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={3}>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "140px" }}
          >
            <StatBox
              title={commissionStatistics.projections}
              subtitle="aka Projections"
              progress="0.80"
              increase="+43%"
              icon={
                <HandshakeIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>

        {/* Row3 */}
        <Grid item sm={12} md={12} lg={8}>
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            sx={{ height: "300px" }}
          >
            <Box
              // mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  ${commissionStatistics.revenue}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart
                data={[
                  {
                    color: tokens("dark").greenAccent[500],
                    id: "revenue",
                    data: revenueTimeSeriesData.map((sale) => {
                      return {
                        x: `${sale.dateCreated.toISOString().split("T")[0]}`,
                        y: sale.cumulativeRevenue,
                      };
                    }),
                  },
                ]}
                isDashboard={true}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            sx={{ height: "300px" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            {transactionsTimeSeriesData.map((transaction, i) => (
              <Box
                key={transaction.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.name}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  {transaction.dateCreated.toISOString().split("T")[0]}
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.amount}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Row4 */}
        <Grid item sm={12} md={12}>
          <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "200px" }}
          >
            <TopsalesBox
              users={usersForLeaderboards.slice(0, 3)}
              title="TOP SALES REPS"
            />
          </Box>
        </Grid>

        {/* Row5 */}
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
            sx={{ height: "300px" }}
          >
            <Typography variant="h5" fontWeight="600">
              Top 5 Most Successful Services in this timeperiod pie graphy
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            sx={{ height: "300px" }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              # Customers trend line by service through timeframe
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
            sx={{ height: "300px" }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
