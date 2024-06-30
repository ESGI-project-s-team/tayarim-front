"use client";
import "../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";
import {IsOpenSideBarContext} from "@/app/[lng]/contexts";
import {useState} from "react";
import {AnalyticsDashboard} from "@/app/components/dashboard-components/list-analytics/AnalyticsDashboard";


export default function Page() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);

    return (
        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                <NavBarDashboard/>
                <SideNavDashboard/>
                <AnalyticsDashboard/>
            </IsOpenSideBarContext.Provider>
        </div>
    );
};