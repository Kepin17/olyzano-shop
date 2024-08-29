import React from "react";
import AuthLayouts from "../../../../layouts/AuthLayout";
import Label from "../../../../elements/label";
import Input from "../../../../elements/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface NewPasswordProps {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const NewPassword: React.FC<NewPasswordProps> = (props) => {
  const { title, onSubmit } = props;

  const [password, setPassword] = React.useState("");
  const [checkPassword, setCheckPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCheckPassword, setShowCheckPassword] = React.useState(false);
  return (
    <AuthLayouts buttonText={"submit"} onSubmit={onSubmit}>
      <h1 className="text-3xl text-[#E88D67] font-bold font-roboto text-center">Please Enter your new {title}</h1>
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

      <div className="flex flex-col gap-3 mt-5">
        <Label htmlFor={"password"}>Confirm Password</Label>
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
    </AuthLayouts>
  );
};

export default NewPassword;
