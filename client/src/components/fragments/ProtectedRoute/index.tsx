import React, { useEffect } from "react";
import LoginPage from "../../pages/Auth/LoginPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  useEffect(() => {
    const getuser = localStorage.getItem("user");
    const user = JSON.parse(getuser || "{}");
    setIsAuthenticated(user.success);
  }, []);

  if (!isAuthenticated) {
    return <LoginPage />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
