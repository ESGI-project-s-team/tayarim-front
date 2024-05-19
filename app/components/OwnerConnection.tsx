import React from "react";
import FormConnection from "@/app/components/ui/signin/FormConnection";
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";

const OwnerConnection: React.FC = () => {
    return (
        <div className="overflow-hidden">
            <BackgroundImageDark/>
            <FormConnection/>
        </div>
    );
}

export default OwnerConnection;