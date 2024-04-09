"use client";
import React from "react";
import "../../globals.css";
import Navbar from "@/app/components/NavBar";
import OwnerConnection from "@/app/components/OwnerConnection";


export default function Page() {
    return (
        <>
            <Navbar/>
            <OwnerConnection/>
        </>
    );
};