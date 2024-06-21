"use client";
import React, {useState} from "react";
import {IsOpenSideBarContext} from "@/app/[lng]/contexts";
import SideNavBarSerch from "@/app/components/search-results-components/ui/side-nav-search/SideNavBarSerch";
import NavBarSearch from "@/app/components/search-results-components/ui/NavBarSearch";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";
import ListResultsHousing from "@/app/components/search-results-components/ui/ListResultsHousing";


export default function Page() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    return (
        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                <NavBarSearch/>
                <div className="lg:ml-80 mt-32 ml-16">
                    <ListResultsHousing/>
                </div>
            </IsOpenSideBarContext.Provider>
        </div>
    )
}
