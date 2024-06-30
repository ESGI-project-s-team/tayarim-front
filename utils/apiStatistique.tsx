"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";

const getAllStatistiqueUrl = `${BACKEND_API}/statistiques`


export async function getAllStatistique(year: number) {
    const token = cookies().get("token")?.value;
    let url = `${getAllStatistiqueUrl}/${year.toString()}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}





