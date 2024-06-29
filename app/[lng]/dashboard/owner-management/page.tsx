"use client";
import "../../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";
import {NotificationContext, IsOpenSideBarContext} from "@/app/[lng]/contexts";
import {useState} from "react";
import OwnerManagement from "@/app/components/dashboard-components/OwnerManagement";

export default function Page() {

    const [items, setItems] = useState();
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    return (
        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                <NotificationContext.Provider value={{items, setItems}}>
                    <NavBarDashboard/>
                </NotificationContext.Provider>
                <SideNavDashboard/>
                <OwnerManagement/>
            </IsOpenSideBarContext.Provider>
        </div>
    );
};