import React from "react";

const SpinnerDashboard = ({color}: { color?: string }) => {
    return (
        <div className="flex justify-center items-center h-96">
            <div
                className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 ${color ? `border-${color}` : "border-[#3b82f6]"}`}
            ></div>
        </div>
    );
};

export default SpinnerDashboard;
