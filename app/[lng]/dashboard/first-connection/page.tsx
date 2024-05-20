"use client";
import "../../../globals.css"
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";
import React from "react";
import Navbar from "@/app/components/NavBar";
import FirstConnection from "@/app/components/dashboard-components/FirstConnection";

export default function Page() {
    return (
        <>
            <BackgroundImageDark/>
            <FirstConnection/>
        </>
    );
};