"use client";
import "../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import HomeDashboard from "@/app/components/dashboard-components/HomeDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";
import {IsOpenSideBarContext} from "@/app/[lng]/contexts";
import {useState} from "react";


export default function Page() {

    const [isOpenSideBar, setIsOpenSideBar] = useState(true);

    return (
        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                    <NavBarDashboard/>
                <SideNavDashboard/>
                <HomeDashboard/>
            </IsOpenSideBarContext.Provider>
        </div>
    );
};