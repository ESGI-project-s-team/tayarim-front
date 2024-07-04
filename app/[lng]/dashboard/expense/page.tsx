"use client";
import "../../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";
import {IsOpenSideBarContext} from "@/app/[lng]/contexts";
import {useState} from "react";
import ReservationDashboard from "@/app/components/dashboard-components/ReservationDashboard";
import DepenseDashboard from "@/app/components/dashboard-components/list-depenses/DepenseDashboard";


export default function Page() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);

    return (
        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                <NavBarDashboard/>
                <SideNavDashboard/>
                <DepenseDashboard/>
            </IsOpenSideBarContext.Provider>
        </div>
    );
};