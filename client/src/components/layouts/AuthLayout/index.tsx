import React from "react";
import Button from "../../elements/Button";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  buttonText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AuthLayouts: React.FC<AuthLayoutProps> = (props) => {
  const { children, buttonText, onSubmit } = props;
  return (
    <form className="w-[400px] h-auto bg-white shadow-lg border-2 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onSubmit={onSubmit}>
      <div className="form-wrapper my-3 px-5">
        {children}
        <div className="flex flex-col gap-1 mt-2">
          {buttonText === "Login" && (
            <Link to={"/forgot-password"} className="text-[#E88D67] text-end font-bold font-roboto text-sm">
              Forgot your password
            </Link>
          )}
          <Link to={buttonText === "Login" ? "/register" : "/login"} className="text-[#E88D67] text-end font-bold font-roboto text-sm">
            Don't have account? {buttonText === "Login" ? "Register" : "Login"}
          </Link>
        </div>
        <Button type="button" className="w-full h-10 bg-[#E88D67] rounded-md font-bold font-roboto text-white mt-3">
          {buttonText === "Login" ? "Login" : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default AuthLayouts;
