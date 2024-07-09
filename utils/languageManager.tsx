"use server";
import {cookies} from "next/headers";

export async function setLanguaeCookie(language: any) {
    cookies().set("i18next", language);
}