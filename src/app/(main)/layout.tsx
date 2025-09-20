import React, { ReactNode } from "react";
import Navbar from "./navbar";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default AuthLayout;
