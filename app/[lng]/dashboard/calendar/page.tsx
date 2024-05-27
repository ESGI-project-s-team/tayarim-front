"use client";
import "../../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import HomeDashboard from "@/app/components/dashboard-components/HomeDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";
import {NotificationContext, IsOpenSideBarContext} from "@/app/[lng]/contexts";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from 'next/navigation';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import Loader from "@/app/components/ui/Loader";
import CalendarDashboard from "@/app/components/dashboard-components/CalendarDashboard";

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
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkTokenInFun().then(
            async (response) => {
                if (response.isPasswordUpdated === false) {
                    router.push("/dashboard/first-connection")
                } else if (response === false) {
                    router.push("/owner-connection")
                }
                setIsLoading(false);
            }
        )
    });
    return (
        <>
            {
                isLoading ? <Loader/>
                    :
                    <div>
                        <IsOpenSideBarContext.Provider value={{isOpenSideBar, setIsOpenSideBar}}>
                            <NotificationContext.Provider value={{items, setItems}}>
                                <NavBarDashboard/>
                            </NotificationContext.Provider>
                            <SideNavDashboard/>
                            <CalendarDashboard/>
                        </IsOpenSideBarContext.Provider>
                    </div>
            }
        </>
    );
};