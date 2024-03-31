"use client";
import React from "react";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";
import Navbar from "@/app/components/NavBar";
import HomeBody from "@/app/components/HomeBody";

export default function Page() {
    return (
        <div className="">
            <div className="relative w-full">
                <div className="w-full ">
                    <Navbar/>
                </div>
                <div className="mt-32 w-full">
                    <SearchRoomReservation/>

                </div>
            </div>

            <div style={{height: '130vh'}}>
            </div>
        </div>
    )
}
