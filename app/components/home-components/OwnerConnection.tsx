import React from "react";
import FormConnection from "@/app/components/ui/signin/FormConnection";
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";
import ModalCreateOwner from "@/app/components/modal/modal-create-owner/ModalCreateOwner";

const OwnerConnection: React.FC = () => {
    return (
        <div className="overflow-hidden ">
            <div
                className=" absolute w-full h-screen  bg-image flex lg:justify-around justify-center items-center ">
                <div className={"z-30"}>
                    <FormConnection/>
                </div>
                <div className={"bg-white min-w-1 min-h-[70vh] hidden lg:block top-36 absolute z-30"}>
                </div>
                <div className={"hidden lg:block z-30"}>
                    <FormConnection/>
                </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
    );
}

export default OwnerConnection;