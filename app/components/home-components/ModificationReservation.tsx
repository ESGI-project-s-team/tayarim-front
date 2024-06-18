import React from "react";
import FormConnection from "@/app/components/ui/signin/FormConnection";
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";
import FormModificationReservation from "@/app/components/ui/modification-reservation/FormModificationReservation";

const OwnerConnection: React.FC = () => {
    return (
        <div className="overflow-hidden">
            <BackgroundImageDark/>
            <FormModificationReservation/>
        </div>
    );
}

export default OwnerConnection;