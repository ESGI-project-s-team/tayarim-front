import React from "react";
import Navbar from "@/app/components/NavBar";
import HomeBody from "@/app/components/HomeBody";
import NavbarScroll from "@/app/components/NavBarScroll";

export default function Page({ params: { lng } } : { params: { lng: string } }) {
    return (
        <body>
        <header className="relative">
            <Navbar lang={lng}/>
        </header>
        <NavbarScroll lang={lng}/>
        <main>
            <HomeBody lang={lng} />
        </main>
        </body>
    );
};


