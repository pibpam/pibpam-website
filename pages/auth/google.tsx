import type { NextPage } from "next";
import React from "react";
import AuthCode from "../../container/AuthCode";

const AuthGoogle: NextPage = () => {
  return <AuthCode execute={true} />;
};

export default AuthGoogle;
