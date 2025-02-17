import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import WalletPage from "../pages/WalletPage";
import SendMoneyPage from "../pages/SendMoneyPage";
import TransactionHistoryPage from "../pages/TransactionHistoryPage";
import CardApplication from "../pages/CardApplication";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
       <Route
        path="/wallet"
        element={
            <PrivateRoute>
            <WalletPage />
            </PrivateRoute>
        }
        />
        <Route
        path="/send-money"
        element={
            <PrivateRoute>
            <SendMoneyPage />
            </PrivateRoute>
        }
        />
        <Route
        path="/transactions"
        element={
            <PrivateRoute>
            <TransactionHistoryPage />
            </PrivateRoute>
        }
        />
        <Route
        path="/apply-card"
        element={
            <PrivateRoute>
            <CardApplication />
            </PrivateRoute>
        }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
