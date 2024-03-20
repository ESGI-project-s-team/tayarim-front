import type {Metadata} from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "Tayarim",
    description: "Tayarim is a platform for airbnb concierge service",
};

export default function RootLayout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body >{props.children}</body>
        </html>
    );
}
