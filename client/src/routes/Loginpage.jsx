import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Loginpage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <SignIn signUpUrl="/register"/>
    </div>
  );
};

export default Loginpage;
