"use client";
import "../../globals.css"
import SideNavDashboard from "@/app/components/dashboard-components/ui/SideNavDashboard";
import HomeDashboard from "@/app/components/dashboard-components/HomeDashboard";
import NavBarDashboard from "@/app/components/dashboard-components/ui/NavBarDashboard";

export default function Page() {
    return (
        <div>
            <NavBarDashboard/>
            <SideNavDashboard/>
            <HomeDashboard/>
        </div>
    );
};