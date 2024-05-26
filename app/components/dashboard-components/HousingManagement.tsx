import React, {useEffect} from 'react';
import {checkTokenInFunIsAdmin} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import ListHousings from "@/app/components/dashboard-components/ui/list-housings/ListHousings";

const HousingManagement: React.FC = () => {
    const router = useRouter()
    useEffect(
        () => {
            checkTokenInFunIsAdmin().then(
                (response) => {
                    if (!response.admin) {
                        router.push("/owner-connection")
                    }
                }
            )
        }, [router]
    )
    return (
        <>
            <ListHousings/>
        </>
    );
};

export default HousingManagement;
