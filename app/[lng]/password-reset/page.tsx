"use client";
import React, {useEffect} from "react";
import "../../globals.css";
import Navbar from "@/app/components/home-components/ui/NavBar";
import ModificationReservation from "@/app/components/home-components/ModificationReservation";
import PasswordReset from "@/app/components/home-components/PasswordReset";


export default function Page() {

    return (
        <>
            <Navbar/>
            <PasswordReset/>
        </>
    );
};