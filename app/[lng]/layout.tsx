import "../globals.css";
import React from "react";
import {languages} from '@/app/il8n/settings'

export async function generateStaticParams() {
    return languages.map((lng: string) => ({lng}))
}

export default function RootLayout({children, params: {lng}}: { children: React.ReactNode, params: { lng: string } }) {
    return (
        <html lang={lng}>
        <head><title>Tayarim</title></head>
        <body>
        {children}
        </body>
        </html>
    )
}
