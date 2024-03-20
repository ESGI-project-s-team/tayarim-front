import React from "react";
import NavbarScroll from "@/app/components/NavBarScroll";

const HomeBody: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 top-20">
            <div className="relative h-screen" style={{ height: '85vh' }}>
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
        </div>
    );
};

export default HomeBody;
