"use client";
import React from "react";
import "../../globals.css";
import Navbar from "@/app/components/home-components/ui/NavBar";
import RecoverPassword from "@/app/components/home-components/RecoverPassword";


export default function Page() {

    return (
        <>
            <Navbar/>
            <RecoverPassword/>
        </>
    );
};