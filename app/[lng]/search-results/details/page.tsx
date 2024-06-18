"use client";
import React from "react";
import NavBarSearch from "@/app/components/search-results-components/ui/NavBarSearch";
import DetailsResult from "@/app/components/details-result/DetailsResult";


export default function Page() {
    return (
        <div>
            <NavBarSearch/>
            <DetailsResult/>
        </div>
    );
};