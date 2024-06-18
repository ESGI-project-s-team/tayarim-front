import React from "react";
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";
import FormModificationReservation from "@/app/components/ui/modification-reservation/FormModificationReservation";
import FormResetPassword from "@/app/components/ui/reset-password/FormResetPassword";

const OwnerConnection: React.FC = () => {
    return (
        <div className="overflow-hidden">
            <BackgroundImageDark/>
            <FormResetPassword/>
        </div>
    );
}

export default OwnerConnection;