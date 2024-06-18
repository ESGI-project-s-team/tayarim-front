"use client";
import React, {useEffect} from "react";
import "../../globals.css";
import Navbar from "@/app/components/home-components/ui/NavBar";
import OwnerConnection from "@/app/components/home-components/OwnerConnection";
import ModificationReservation from "@/app/components/home-components/ModificationReservation";


export default function Page() {

    return (
        <>
            <Navbar/>
            <ModificationReservation/>
        </>
    );
};