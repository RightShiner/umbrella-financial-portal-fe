import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const TeamMemberDetails = () => {
    const { userId } = useParams();
    console.log(userId);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { sessionToken } = useContext(UserContext);
    const [teamMember, setTeamMember] = useState({});
    console.log(teamMember);
    useEffect(() => {
        const include = {
            accounts: {
                include: {
                    transactions: {
                        where: {
                            sale: {
                                dateCreated: {
                                    lt: new Date()
                                }
                            }
                        },
                        include: {
                            sale: true
                        }
                    }
                }
            }
        };
        axios({
            method: "get",
            url: `https://umbrella.rest.ghlmanager.com/users/${userId}?include=${btoa(JSON.stringify(include))}`,
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        })
            .then(function (response) {
                if (response.data == null) {
                    return;
                }
                const userData = response.data.user;
                if (userData == null) {
                    return;
                }
                console.log(response);
                setTeamMember(userData);
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        key={teamMember.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {teamMember.id}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Transactions
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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Sale Date</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teamMember == null ? null : teamMember.accounts == null ? null : teamMember.accounts.length === 0 ? null : teamMember.accounts[0].transactions.map(transaction => <TableRow
                                        key={transaction.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {transaction.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {transaction.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {transaction.dateCreated}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {transaction.amount}
                                        </TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/*<Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Sales
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
                                        <TableCell>Sale Date</TableCell>
                                        <TableCell>Purchase Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teamMember == null ? null : teamMember.accounts == null ? null : teamMember.accounts.length === 0 ? null : teamMember.accounts[0].transactions.map(transaction => <TableRow
                                        key={transaction.sale.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {transaction.sale.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {transaction.sale.dateCreated}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {transaction.sale.purchasePrice}
                                        </TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                </AccordionDetails>
                                    </Accordion>*/}
        </Box>
    );
};

export default TeamMemberDetails;
