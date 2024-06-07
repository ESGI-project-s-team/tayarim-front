"use client";
import React, {useEffect, useState} from "react";
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import Loader from "@/app/components/ui/Loader";
import {isAdminByToken} from "@/utils/apiAuth";
import {
    IsAdminContext,
    UserInfoContext,
    LoaderContext
} from "../contexts";

export default function RootLayout({children}: { children: React.ReactNode; params: { lng: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(undefined);
    const [userInfos, setUserInfos] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('RootLayoutDashboard')
        checkTokenInFun().then(
            async (response) => {
                if (response.isPasswordUpdated === false) {
                    router.push("/dashboard/first-connection")
                } else if (response === false) {
                    router.push("/owner-connection")
                }
            }
        )

        async function isAdmin() {
            await isAdminByToken().then(
                async (response) => {
                    if (!response.error && response !== false && response !== undefined) {
                        setIsAdmin(response.admin)
                    }
                }
            )
        }

        async function fetchInfoUser() {
            const user = {
                id: localStorage.getItem("id"),
                nom: localStorage.getItem("nom"),
                prenom: localStorage.getItem("prenom"),
                email: localStorage.getItem("email"),
                numTel: localStorage.getItem("numTel"),
            }
            setUserInfos(user);
        }

        fetchInfoUser().then();
        isAdmin().then(
            () => {
                setIsLoading(false)
            }
        );
    }, [router]);
    return (
        <div>
            {isLoading ? <Loader/> : null}
            <IsAdminContext.Provider value={{isAdmin, setIsAdmin}}>
                <UserInfoContext.Provider value={{userInfos, setUserInfos}}>
                    <LoaderContext.Provider value={{loading, setLoading}}>
                        {children}
                    </LoaderContext.Provider>
                </UserInfoContext.Provider>
            </IsAdminContext.Provider>
        </div>
    );
}