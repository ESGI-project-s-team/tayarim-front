"use client";
import React, {useState} from "react";
import {IsOpenSideBarContext} from "@/app/[lng]/contexts";
import SideNavBarSerch from "@/app/components/search-results-components/ui/SideNavBarSerch";
import NavBarSearch from "@/app/components/search-results-components/ui/NavBarSearch";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";


export default function Page() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    return (
        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                <NavBarSearch/>
                <SideNavBarSerch/>
                <div className="lg:ml-80 mt-32">
                    <SearchRoomReservation/>
                </div>
            </IsOpenSideBarContext.Provider>
        </div>
    )
}
