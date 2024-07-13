import React from "react";
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";
import FormSendEmailResetPassword from "@/app/components/ui/reset-password/FormSendEmailResetPassword";

const OwnerConnection: React.FC = () => {
    return (
        <div className="overflow-hidden">
            <BackgroundImageDark/>
            <FormSendEmailResetPassword/>
        </div>
    );
}

export default OwnerConnection;