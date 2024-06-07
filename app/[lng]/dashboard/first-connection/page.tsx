"use client";
import "../../../globals.css"
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";
import React from "react";
import FirstConnection from "@/app/components/dashboard-components/FirstConnection";

export default function Page() {
    return (
        <>
            <BackgroundImageDark/>
            <FirstConnection/>
        </>
    );
};