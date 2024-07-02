"use client";
import React, {useEffect, useState, useRef, useMemo} from "react";
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import Loader from "@/app/components/ui/Loader";
import {isAdminByToken} from "@/utils/apiAuth";
import {
    IsAdminContext,
    UserInfoContext,
    LoaderContext,
    NotificationContext,
} from "../contexts";
import {usePopupNotify} from "@/app/[lng]/hooks";
import {getAllNotificationsInFun} from "@/app/components/dashboard-components/ui/notifications/actions";

export default function RootLayout({children}: { children: React.ReactNode; params: { lng: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<any>(undefined);
    const [userInfos, setUserInfos] = useState({});
    const [loading, setLoading] = useState(false);
    const socketRef = useRef<any>(null);
    const [messages, setMessages] = useState<any>([]);
    const {setPopupNotify} = usePopupNotify();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_URL_SOCKET}/socket`);
        socketRef.current = newSocket;

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
            sendMessage("Connect : Bearer " + localStorage.getItem("tokenSocket"));
        };

        newSocket.onmessage = (event: any) => {
            try {
                const data = JSON.parse(event.data);
                setPopupNotify(data.type);
                setMessages((prevMessages: any) => [...prevMessages, event.data]);
            } catch (error) {
                console.error("Invalid JSON:", error);
            }
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

    }, [messages, setPopupNotify]);

    const sendMessage = (message: string) => {
        if (socketRef.current) {
            socketRef.current.send(message);
        }
    };
    useEffect(() => {
        async function isAdmin() {
            isAdminByToken().then(
                (response) => {
                    if (!response.error && response !== false && response !== undefined) {
                        setIsAdmin(response.admin);
                    } else {
                        setIsAdmin(false)
                    }
                    setLoading(false)
                }
            );
        }

        isAdmin().then(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        console.log('RootLayoutDashboard');
        checkTokenInFun().then(
            (response) => {
                if (response.token) {
                    localStorage.setItem("tokenSocket", response.token);
                    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                        sendMessage("Connect : Bearer " + response.token);
                    } else {
                        socketRef.current.onopen = () => {
                            sendMessage("Connect : Bearer " + response.token);
                        };
                    }
                }
                if (response.isPasswordUpdated === false) {
                    router.push("/dashboard/first-connection");
                } else if (response === false) {
                    router.push("/owner-connection");
                }
            }
        );

        async function fetchInfoUser() {
            const user = {
                id: localStorage.getItem("id"),
                nom: localStorage.getItem("nom"),
                prenom: localStorage.getItem("prenom"),
                email: localStorage.getItem("email"),
                numTel: localStorage.getItem("numTel"),
            };
            setUserInfos(user);
        }

        async function getAllNotifications() {
            getAllNotificationsInFun().then((data) => {
                if (data.errors) {
                    setItems([]);
                    return;
                }
                data.sort((a: any, b: any) => b.id - a.id);
                setItems(data);
            });
        }

        getAllNotifications().then();
        fetchInfoUser().then(() => setIsLoading(false));
    }, [router]);

    return (
        <div>
            {isLoading ? <Loader/> : null}
            <IsAdminContext.Provider value={{isAdmin, setIsAdmin}}>
                <UserInfoContext.Provider value={{userInfos, setUserInfos}}>
                    <LoaderContext.Provider value={{loading, setLoading}}>
                        <NotificationContext.Provider value={{items, setItems}}>
                            {children}
                        </NotificationContext.Provider>
                    </LoaderContext.Provider>
                </UserInfoContext.Provider>
            </IsAdminContext.Provider>
        </div>
    );
}
