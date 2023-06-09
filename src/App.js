import { createContext, useContext, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Reports from "./scenes/reports";
import Transactions from "./scenes/transactions";
import Customers from "./scenes/customers";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Login from "./scenes/login";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Contacts from "./scenes/contacts";
import Profile from "./scenes/profile";
import SaleDetail from "./scenes/SaleDetail";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import MainLayout from "./layouts/MainLayout";
import { UserContext } from "./contexts/UserContext";
import Sales from "./scenes/sales";
import TeamMemberDetails from "./scenes/team/details";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(
    (localStorage.getItem("user") || null) == null
      ? null
      : JSON.parse(localStorage.getItem("user"))
  );
  const [sessionToken, setSessionToken] = useState(
    localStorage.getItem("sessionToken") || null
  );
  const [saletemp, setSaletemp] = useState(null);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (sessionToken == null && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider
          value={{ user, sessionToken, setUser, setSessionToken, saletemp }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/sales"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <Sales setSaletemp={(value) => setSaletemp(value)} />
                </MainLayout>
              }
            />
            <Route
              path="/transactions"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <Transactions
                    setSelectedTransaction={(value) =>
                      setSelectedTransaction(value)
                    }
                  />
                </MainLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <Profile
                    setSelectedTransaction={(value) =>
                      setSelectedTransaction(value)
                    }
                  />
                </MainLayout>
              }
            />
            <Route
              path="/calendar"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <Calendar
                    setSelectedTransaction={(value) =>
                      setSelectedTransaction(value)
                    }
                  />
                </MainLayout>
              }
            />
            <Route
              path="/shop"
              element={<Link to="http://localhost:3000"></Link>}
            />
            <Route
              path="/team"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <Team />
                </MainLayout>
              }
            />
            <Route
              path="/team/:userId/details"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <TeamMemberDetails />
                </MainLayout>
              }
            />
            {/*
            <Route path="/transactions" element={<MainLayout isSidebar={isSidebar} setIsSidebar={value => setIsSidebar(value)}><Transactions /></MainLayout>} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} />*/}

            <Route
              path="/login"
              element={
                <Login
                  setUser={(value) => setUser(value)}
                  setSessionToken={(value) => setSessionToken(value)}
                />
              }
            />

            <Route
              path="/detail"
              element={
                <MainLayout
                  isSidebar={isSidebar}
                  setIsSidebar={(value) => setIsSidebar(value)}
                >
                  <SaleDetail />
                </MainLayout>
              }
            />
          </Routes>
        </UserContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
