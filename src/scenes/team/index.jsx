import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const { user, sessionToken, saletemp } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`/team/${id}/details`);
  }
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
            }
          }
        }
      }
    };
    axios({
      method: "get",
      url: `https://umbrella.rest.ghlmanager.com/users?include=${btoa(JSON.stringify(include))}`,
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then(function (response) {
        const usersData = response.data.users;
        console.log(response);
        for (const [index, user] of usersData.entries()) {
          if (user.accounts) {
            if (user.accounts.length > 0) {
              if (user.accounts[0].transactions) {
                user.totalCommissions = user.accounts[0].transactions.map(transaction => Number(transaction.amount)).reduce((partialSum, a) => partialSum + a, 0);
              }
            }

          }
        }
        setUsers(usersData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "totalCommissions",
      headerName: "Commissions",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "ADMIN"
                ? colors.greenAccent[600]
                : role === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
            {/*access === "manager" && <SecurityOutlinedIcon />*/}
            {role === "USER" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              type === "CORPORATE_PARTNER"
                ? colors.greenAccent[600]
                : type === "PARTNER"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {type}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        }}
      >
        <DataGrid checkboxSelection rows={users} columns={columns} onRowClick={handleRowClick} />
      </Box>
    </Box>
  );
};

export default Team;
