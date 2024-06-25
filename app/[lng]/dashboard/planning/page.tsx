"use client";
import "../../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";
import {IsOpenSideBarContext} from "@/app/[lng]/contexts";
import {useState} from "react";
import {useRouter} from 'next/navigation';
import PlanningDashboard from "@/app/components/dashboard-components/ui/planning/PlanningDashboard";

export default function Page() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    const router = useRouter();

    return (

        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                <NavBarDashboard/>
                <SideNavDashboard/>
                <PlanningDashboard/>
            </IsOpenSideBarContext.Provider>
        </div>

    );
};