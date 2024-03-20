import React from "react";
import Navbar from "@/app/components/NavBar";
import HomeBody from "@/app/components/HomeBody";
import NavbarScroll from "@/app/components/NavBarScroll";

export default function Home() {
    return (
        <body>
        <header className="relative">
            <Navbar/>
        </header>
        <NavbarScroll/>
        <main>
            <HomeBody/>
        </main>
        </body>
    );
}