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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Detail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sales, setSales] = useState([]);
  const { user, sessionToken } = useContext(UserContext);

  useEffect(() => {
    setSales([
      {
        id: "1",
        purchasePrice: "5000",
        sellingUserName: "1",
        purchasingUserName: "customer",
      },
    ]);
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
                    <TableCell align="right">purchasePrice</TableCell>
                    <TableCell align="right">sellingUserName</TableCell>
                    <TableCell align="right">purchasingUserName</TableCell>
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
                      <TableCell align="right">{row.purchasePrice}</TableCell>
                      <TableCell align="right">{row.sellingUserName}</TableCell>
                      <TableCell align="right">
                        {row.purchasingUserName}
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
            Product Infomation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Commission Plan Infomation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Detail;
