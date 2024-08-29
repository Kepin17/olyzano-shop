import React from "react";
import AuthLayouts from "../../../../layouts/AuthLayout";
import Label from "../../../../elements/label";
import Input from "../../../../elements/input";

interface VerifyEmailProps {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
  const { title, onSubmit } = props;
  return (
    <AuthLayouts buttonText={"submit"} onSubmit={onSubmit}>
      <h1 className="text-3xl text-[#E88D67] font-bold font-roboto text-center">Please verify your {title}</h1>
      <div className="flex flex-col gap-3 mt-5">
        <Label htmlFor={"email"}>{title}</Label>
        <Input type="email" name={"email"} placeholder={"Email"} className="border-2 p-2 focus:outline-none rounded-md"></Input>
      </div>
    </AuthLayouts>
  );
};

export default VerifyEmail;
