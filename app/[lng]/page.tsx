import React from "react";
import Navbar from "@/app/components/Navbar";
import HomeBody from "@/app/components/HomeBody";
import NavbarScroll from "@/app/components/NavbarScroll";
import {useTranslation} from "@/app/il8n";

export default function Page({params: {lng}}: { params: { lng: string } }) {
    return (
        <body>
        <header className="relative">
            <Navbar lang={lng}/>
        </header>
        <main>
            <NavbarScroll lang={lng}/>
            <HomeBody lang={lng}/>
        </main>
        </body>
    );
};


