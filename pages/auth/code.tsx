import type { NextPage } from "next";
import React from "react";
import AuthCode from "../../container/AuthCode";

const AuthGoogleFinish: NextPage = () => {
  return <AuthCode execute={false} />
};

export default AuthGoogleFinish;
