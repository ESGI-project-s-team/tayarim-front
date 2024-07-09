"use client";
import React from "react";
import DetailsResult from "@/app/components/details-result/DetailsResult";
import NavBarDetails from "@/app/components/search-results-components/ui/NavBarDetails";


export default function Page() {
    return (
        <div>
            <NavBarDetails/>
            <DetailsResult/>
        </div>
    );
};