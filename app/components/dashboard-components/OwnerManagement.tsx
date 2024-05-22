import React, {useEffect} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import ListOwners from "@/app/components/dashboard-components/ui/list-owners/ListOwners";

const OwnerManagement: React.FC = () => {
    const router = useRouter()
    useEffect(
        () => {
            checkTokenInFun().then(
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
            <ListOwners/>
        </>
    );
};

export default OwnerManagement;
