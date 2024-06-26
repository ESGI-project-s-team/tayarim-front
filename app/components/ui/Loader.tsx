import React from "react";

export default function Loader() {
    return (
        <div id="loading-overlay"
             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 flex-col">
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-64 w-64 flex justify-center items-center border border-white" src="/black-logo.jpg" alt="logo"/>
            </div>
            <div className="flex">
                <svg className="animate-spin h-28 w-10 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>
        </div>
    );
}