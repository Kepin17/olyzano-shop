import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/User/home";
import LoginPage from "./components/pages/Auth/LoginPage";
import RegisterPage from "./components/pages/Auth/RegisterPage";
import ForgotPasswordPage from "./components/pages/Auth/ForgotPasswordPage";
import ProtectedRoute from "./components/fragments/ProtectedRoute";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getuser = localStorage.getItem("user");
    const user = JSON.parse(getuser || "{}");
    setUser(user);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
