"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";

const getAllNotificationsUrl = `${BACKEND_API}/notifications`
const updateStatusNotificationsUrl = `${BACKEND_API}/notifications/read`

export async function getAllNotifications() {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getAllNotificationsUrl, {
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

export async function updateStatusNotifications(id: string) {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(`${updateStatusNotificationsUrl}/${id}`, {
            method: "PUT",
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


