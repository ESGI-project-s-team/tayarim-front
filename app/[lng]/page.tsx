"use client";
import HomeBody from "@/app/components/home-components/HomeBody";
import React from "react";
import OurServices from "@/app/components/home-components/OurServices";
import HostInformations from "@/app/components/home-components/HostInformation";
import FrequentlyAskedQuestions from "@/app/components/home-components/FrequentlyAskedQuestions";
import Footer from "@/app/components/ui/Footer";
import {IsOpenContext, NavbarContext} from "@/app/[lng]/contexts";
import Navbar from "@/app/components/home-components/ui/NavBar";


export default function Page() {
    return (
        <div>
            <Navbar/>
            <HomeBody/>
            <OurServices/>
            <HostInformations/>
            <FrequentlyAskedQuestions/>
            <Footer/>
        </div>
    );
};