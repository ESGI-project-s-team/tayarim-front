"use client";
import HomeBody from "@/app/components/HomeBody";
import React from "react";
import OurServices from "@/app/components/OurServices";
import HostInformations from "@/app/components/HostInformation";
import FrequentlyAskedQuestions from "@/app/components/FrequentlyAskedQuestions";
import Footer from "@/app/components/Footer";
import {IsOpenContext, NavbarContext} from "@/app/[lng]/contexts";
import Navbar from "@/app/components/NavBar";


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