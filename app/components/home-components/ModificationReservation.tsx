import React from "react";
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";
import FormModificationReservation from "@/app/components/ui/modification-reservation/FormModificationReservation";

const OwnerConnection: React.FC = () => {
    return (
        <div className="overflow-hidden">
            <FormModificationReservation/>
        </div>
    );
}

export default OwnerConnection;