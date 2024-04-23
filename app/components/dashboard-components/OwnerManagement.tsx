import React, {useEffect} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";

const OwnerManagement: React.FC = () => {
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
        <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0 ">
            <div
                className=" rounded-sm border stroke-2 bg-[#ffffff] shadow relative top-32 ">
                <div className="px-4 py-6 md:px-6 xl:px-7"><h4
                    className="text-xl font-semibold text-black">Owners</h4></div>
                <div
                    className="grid  border-t stroke-1 px-4 py-4 lg:grid-cols-6 grid-cols-8 md:px-6 2xl:px-7">
                    <div className="col-span-2 flex items-center"><p className="font-medium">Owner Name</p></div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2  items-center flex"><p className="font-medium">E-mail</p>
                    </div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2 flex items-center"><p className="font-medium">Phone</p></div>
                </div>
                <div
                    className="grid  border-t stroke-2 px-4 py-4 lg:grid-cols-6 grid-cols-8 md:px-6 2xl:px-7 ">
                    <div className="col-span-2 flex items-center">
                        <div className="flex  gap-4 flex-row items-center">
                            <p className="text-sm text-black">Apple Watch Series 7</p></div>
                    </div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2  items-center flex"><p
                        className="text-sm text-black">Electronics</p></div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2 flex items-center"><p
                        className="text-sm text-black">$297</p>
                    </div>
                </div>
                <div
                    className="grid  border-t stroke-2 px-4 py-4 lg:grid-cols-6 grid-cols-8 md:px-6 2xl:px-7 ">
                    <div className="col-span-2 flex items-center">
                        <div className="flex  gap-4 flex-row items-center">
                            <p className="text-sm text-black">Apple Watch Series 7</p></div>
                    </div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2  items-center flex"><p
                        className="text-sm text-black">Electronics</p></div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2 flex items-center"><p
                        className="text-sm text-black">$297</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OwnerManagement;
