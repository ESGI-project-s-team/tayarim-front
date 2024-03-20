import React from "react";
import Navbar from "@/app/components/NavBar";
import HomeBody from "@/app/components/HomeBody";

export default function Home() {
    return (
        <body>
            <header className="bg-white shadow">
                <Navbar/>
            </header>
            <main>
                <HomeBody/>
            </main>
        </body>
    );
}