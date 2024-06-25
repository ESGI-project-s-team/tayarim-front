"use server";
import {getAllNotifications, updateStatusNotifications} from "@/utils/apiNotification";


export async function getAllNotificationsInFun() {
    try {
        return await getAllNotifications();
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function updateStatusNotificationsInFun(id: string) {
    try {
        return await updateStatusNotifications(id);
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}


