import React from "react";
import VerifyEmail from "../../../fragments/AuthFragment/Reset/VerifyEmail";
// import NewPassword from "../../../fragments/AuthFragment/Reset/NewPassword";

const ForgotPasswordPage = () => {
  const verifyEmailHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Email Found");
  };

  // const updatePasswordHandler = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };
  return (
    <>
      <VerifyEmail title="Email" onSubmit={verifyEmailHandler} />
      {/* <NewPassword title="Password" onSubmit={updatePasswordHandler} /> */}
    </>
  );
};

export default ForgotPasswordPage;
