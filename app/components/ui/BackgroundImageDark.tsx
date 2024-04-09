import React from "react";

const BackgroundImageDark: React.FC = () => {
    return (
        <>
            <div className="relative h-screen" style={{height: '100vh'}}>
                <div className="absolute inset-0 overflow-hidden ">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
                </div>
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
        </>
    );
}

export default BackgroundImageDark;