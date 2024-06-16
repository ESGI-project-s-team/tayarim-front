"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const getAllReservationsUrl = `${BACKEND_API}/reservations`


export async function getAllReservations(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getAllReservationsUrl, {
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
            return {errors: "error_occurred"};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}