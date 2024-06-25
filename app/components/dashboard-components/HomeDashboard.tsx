import React, {useEffect} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";

const HomeDashboard: React.FC = () => {
    const router = useRouter()
    useEffect(
        () => {
            checkTokenInFun().then(
                (response) => {
                    if (!response) {
                        router.push("/owner-connection")
                    }
                }
            )
        }, [router]
    )
    return (
        <div className="bg-[#f1f5f9] h-screen ml-14">
            {/*TODO ANALYTICS*/}
        </div>
    );
};

export default HomeDashboard;
