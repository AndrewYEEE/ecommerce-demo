import React, { ReactElement, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Navbar";

interface LayoutProps {
    children: ReactNode,
}


const Layout = ({children}:LayoutProps)=>{
    return (
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    )
};

export default Layout;