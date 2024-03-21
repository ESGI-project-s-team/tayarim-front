"use client";
import React, {useEffect, useState} from "react";
import "../globals.css";
import {useTranslation} from "@/app/il8n";

interface NavbarScrollProps {
    lang: string;
}

const NavbarScroll: React.FC<NavbarScrollProps> = (props) => {
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);

    useEffect(() => {
        async function fetchTranslation() {
            return await useTranslation(props.lang);
        }

        fetchTranslation().then((t) => {
            setTranslation(t);
        });
    }, [props]);
    const items: string[] = [translation?.t('nav_services'), translation?.t('nav_about'), translation?.t('nav_faq')];
    return (
        <div className="w-full bg-custom-scroll z-10 fixed top-32 bg-custom-scroll-opacity">
            <ul className="flex justify-around whitespace-nowrap">
                {items.map((item, index) => (
                    <li key={index}
                        className="py-5 cursor-pointer rounded font-normal text-sm">
                        <a className="rounded">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default NavbarScroll;

