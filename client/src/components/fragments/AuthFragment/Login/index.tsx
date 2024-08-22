import React, { useState } from "react";
import Label from "../../../elements/label";
import Input from "../../../elements/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayouts from "../../../layouts/AuthLayout";
import axios from "axios";

interface LoginProps {
  title?: string;
}

const Login: React.FC<LoginProps> = (props) => {
  const { title = "submit" } = props;
  const [showPassword, setShowPassword] = useState(false);

  const LoginHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/login", {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/";
        }
      });
  };

  return (
    <AuthLayouts buttonText={title} onSubmit={LoginHandler}>
      <h1 className="text-3xl text-[#E88D67] font-bold font-roboto text-center mb-5">{title} Page</h1>
      <div className="flex flex-col gap-3 ">
        <Label htmlFor={"email"}>Email / Phone Number</Label>
        <Input type="email" name="email" placeholder="Email / Phone Number" className={"bg-white shadow-md focus:outline-none w-full border-2 h-10 px-2 autocomplete:off rounded-md"} />
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <Label htmlFor={"password"}>Password</Label>

        <div className="relative">
          <Input type={showPassword ? "text" : "password"} name="password" placeholder="*****" className={"bg-white shadow-md focus:outline-none w-full border-2 h-10 px-2 autocomplete:off rounded-md"} />
          <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">{showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}</div>
        </div>
      </div>
    </AuthLayouts>
  );
};

export default Login;
