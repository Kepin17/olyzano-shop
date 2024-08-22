import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/User/home";
import LoginPage from "./components/pages/Auth/LoginPage";
import RegisterPage from "./components/pages/Auth/RegisterPage";
import UserProfilePage from "./components/pages/Auth/UserProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
