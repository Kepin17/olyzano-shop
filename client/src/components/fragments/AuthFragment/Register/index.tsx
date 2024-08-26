import React, { useState } from "react";
import AuthLayouts from "../../../layouts/AuthLayout";
import Label from "../../../elements/label";
import Input from "../../../elements/input";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  title?: string;
}

const Register: React.FC<RegisterProps> = (props) => {
  const { title = "submit" } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const RegisterHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // active from

    if (password !== checkPassword) {
      alert("Password does not match");
    } else {
      axios
        .post("http://localhost:8000/api/v1/register", {
          username: username,
          email: email,
          password: password,
          confirm_password: checkPassword,
        })
        .then((response) => {
          navigate("/login");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <AuthLayouts buttonText={title} onSubmit={RegisterHandler}>
      <h1 className="text-3xl text-[#E88D67] font-bold font-roboto text-center mb-5">{title} Page</h1>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 ">
          <Label htmlFor={"username"}>Username</Label>
          <Input
            type="username"
            name="username"
            placeholder="username"
            className={"bg-white shadow-md focus:outline-none w-full border-2 h-10 px-2 autocomplete:off rounded-md"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 ">
          <Label htmlFor={"email"}>Email / Phone Number</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email / Phone Number"
            className={"bg-white shadow-md focus:outline-none w-full border-2 h-10 px-2 autocomplete:off rounded-md"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 ">
          <Label htmlFor={"password"}>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="*****"
              className={"bg-white shadow-md focus:outline-none w-full border-2 h-10 px-2 autocomplete:off rounded-md"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">{showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <Label htmlFor={"password"}>Password</Label>
          <div className="relative">
            <Input
              type={showCheckPassword ? "text" : "password"}
              name="Checkpassword"
              placeholder="*****"
              className={"bg-white shadow-md focus:outline-none w-full border-2 h-10 px-2 autocomplete:off rounded-md"}
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
              {showCheckPassword ? <FaEyeSlash onClick={() => setShowCheckPassword(!showCheckPassword)} /> : <FaEye onClick={() => setShowCheckPassword(!showCheckPassword)} />}
            </div>
          </div>
        </div>
      </div>
    </AuthLayouts>
  );
};

export default Register;
