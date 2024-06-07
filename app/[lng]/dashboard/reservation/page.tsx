"use client";
import "../../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import HomeDashboard from "@/app/components/dashboard-components/HomeDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";
import {NotificationContext, IsOpenSideBarContext} from "@/app/[lng]/contexts";
import {useMemo, useState} from "react";


export default function Page() {
    const itemsAll = useMemo(() => [
        {
            title: 'Edit your information in a swipe',
            description: ' Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
            date: '12 May, 2025',
            state: true
        },
        {
            title: 'Edit your information in a swipe',
            description: ' Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
            date: '12 May, 2025',
            state: false
        },
        {
            title: 'Edit your information in a swipe',
            description: ' Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
            date: '12 May, 2025',
            state: true
        },
        {
            title: 'Edit your information in a swipe',
            description: ' Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
            date: '12 May, 2025',
            state: false
        }
    ], [])
    const [items, setItems] = useState(itemsAll);
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);

    return (
        <div>
            <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                <NotificationContext.Provider value={{items, setItems}}>
                    <NavBarDashboard/>
                </NotificationContext.Provider>
                <SideNavDashboard/>
                <HomeDashboard/>
            </IsOpenSideBarContext.Provider>
        </div>
    );
};