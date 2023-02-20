import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
import { getCommissionData } from "../../services/dashboard";
import { UserContext } from "../../contexts/UserContext";

//datepicker
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//grid
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

//select Field
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Dashboard = () => {
  const { user, sessionToken, saletemp } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filterDate, setFilterDate] = useState(null);


  const [totalCommPaid, setTotalCommPaid] = useState("12361");
  const [totalCom, setTotalCom] = useState("12361");
  const [avgCom, setAvgCom] = useState("12361");
  const [towardsGoal, setTowardsGoal] = useState("12361");
  const [akaRev, setAkaRev] = useState("12361");
  const [akaSales, setAkaSales] = useState("12361");
  const [akaDeli, setAkaDeli] = useState("12361");
  const [akaProj, setAkaProj] = useState("12361");
  useEffect(() => {
    async function fetchData() {
      const response = await getCommissionData(sessionToken);
      setTotalCommPaid(response.totalComPaid);
      setTotalCom(response.totalCom);
      setAvgCom(response.avgCom);
      setTowardsGoal(response.towardsGoal);
      setAkaRev(response.akaRev);
      setAkaSales(response.akaSales);
      setAkaDeli(response.akaDeli);
      setAkaProj(response.akaProj);
    }
    fetchData();
  }, []);

  //select Field
  const [filterField, setFilterField] = useState('');
  const handleChangeFilterField = (event) => {
    setFilterField(event.target.value);
  };

  const [filterOperator, setFilterOperator] = useState('');
  const handleChangeFilterOperator = (event) => {
    setFilterOperator(event.target.value);
  };



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
      <Box
        sx={{ background: '#1f2a40' }}
        mb="20px"
        p="20px"
      >
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
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Date</MenuItem>
                  <MenuItem value={1}>Commission</MenuItem>
                  <MenuItem value={2}>Revenue</MenuItem>
                  <MenuItem value={3}>Sales</MenuItem>
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
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>contains</MenuItem>
                  <MenuItem value={1}>equals</MenuItem>
                  <MenuItem value={2}>starts with</MenuItem>
                  <MenuItem value={3}>ends with</MenuItem>
                  <MenuItem value={4}>is empty</MenuItem>
                  <MenuItem value={5}>is not empty</MenuItem>
                  <MenuItem value={6}>is any of</MenuItem>              </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            Value
            <div>
              {filterField == 0 ?
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label=""
                    value={filterDate}
                    onChange={(newValue) => {
                      setFilterDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                :
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              }

            </div>
          </Grid>
        </Grid>
      </Box>
      {/* end of filter */}

      {/* GRID & CHARTS */}

      <Grid
        container
        spacing={2}
      >
        {/* Row1 */}
        <Grid item sm={6} md={6} lg={3} >
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '140px' }}
          >
            <StatBox
              title={totalCommPaid}
              subtitle="Total Commission Due to be paid out based on total sum of transactions"
              progress="0.75"
              increase="+14%"
              icon={
                <EmailIcon
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
            sx={{ height: '140px' }}
          >
            <StatBox
              title={totalCom}
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
            sx={{ height: '140px' }}
          >
            <StatBox
              title={avgCom}
              subtitle="Avg commission amount."
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
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
            sx={{ height: '140px' }}
          >
            <StatBox
              title={towardsGoal}
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
            sx={{ height: '140px' }}
          >
            <StatBox
              title={akaRev}
              subtitle="aka Revenue"
              progress="0.75"
              increase="+14%"
              icon={
                <EmailIcon
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
            sx={{ height: '140px' }}
          >
            <StatBox
              title={akaSales}
              subtitle="aka Sales"
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
            sx={{ height: '140px' }}
          >
            <StatBox
              title={akaDeli}
              subtitle="aka Delinquents"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
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
            sx={{ height: '140px' }}
          >
            <StatBox
              title={akaProj}
              subtitle="aka Projections"
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

        {/* Row3 */}
        <Grid item sm={12} md={12} lg={8}>
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            sx={{ height: '300px' }}
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
                  $59,342.32
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
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            sx={{ height: '300px' }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
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
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Row4 */}
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '200px' }}
          >
            <TopsalesBox
              title="TOP SALES RESP FOR 06-2020"
              name1="Pam Beesly"
              description1="$70,428.00(74% heigher than previous month)"
              name2="Dwight Schrute"
              description2="$42,428.00(241% heigher than previous month)"
              name3="Ryan Howard"
              description3="$32,428.00(45% heigher than previous month)"
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '200px' }}
          >
            <TopsalesBox
              title="TOP SALES RESP FOR 07-2020"
              name1="Ryan Howard"
              description1="$70,428.00(74% heigher than previous month)"
              name2="Dwight Schrute"
              description2="$42,428.00(241% heigher than previous month)"
              name3="Pam Beesly"
              description3="$32,428.00(45% heigher than previous month)"
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
            sx={{ height: '300px' }}
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
              <Typography>Includes extra misc expenditures and costs</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            sx={{ height: '300px' }}
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
            sx={{ height: '300px' }}
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
