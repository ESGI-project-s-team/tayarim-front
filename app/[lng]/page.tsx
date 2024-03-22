"use client";
import HomeBody from "@/app/components/HomeBody";
import NavbarScroll from "@/app/components/NavbarScroll";
import Loader from "@/app/components/Loader";
import React from "react";

export default function Page() {
    return (
        <div>
            <NavbarScroll/>
            <HomeBody/>
        </div>
    );
};