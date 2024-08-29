import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/User/home";
import LoginPage from "./components/pages/Auth/LoginPage";
import RegisterPage from "./components/pages/Auth/RegisterPage";
import ForgotPasswordPage from "./components/pages/Auth/ForgotPasswordPage";
import ProtectedRoute from "./components/fragments/ProtectedRoute";
import Dashboard from "./components/pages/Admin/DashboardPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
