// components/HeaderFooter.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/widgets/Navbar";
// import Footer from "@/app/widgets/Footer";

const HeaderFooter = () => {
    const pathname = usePathname();

    // Define an array of paths where the navbar and footer should not be displayed
    const hiddenPaths = ['/sign-in', '/sign-up']; // Add your specific paths here

    const showNavbarFooter = !hiddenPaths.includes(pathname);

    return (
        <>
            {showNavbarFooter && <Navbar />}
            {/* {showNavbarFooter && <Footer />} */}
        </>
    );
};

export default HeaderFooter;
