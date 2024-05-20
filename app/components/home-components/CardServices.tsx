import React from "react";

interface CardServicesProps {
    title: string;
    description: string;
    icon: any;
}

const CardServices: React.FC<CardServicesProps> = ({
                                                       title,
                                                       description,
                                                       icon
                                                   }) => {
    return (
        <div className="bg-white rounded-xl mt-5 p-6 shadow-2xl ">
            <div className="text-center w-full flex justify-center">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-center mt-4">{title}</h3>
            <p className="text-gray-500 text-center mt-2">{description}</p>
        </div>


    );
}
export default CardServices;