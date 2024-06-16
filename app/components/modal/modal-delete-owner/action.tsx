"use server";
import {deleteOwner} from "@/utils/apiOwner";
import {deleteReservation} from "@/utils/apiReservation";


export async function deleteOwnerInFun(credentials: any) {
    try {
        return await deleteOwner(credentials);
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function deleteReservationInFun(credentials: any) {
    try {
        return await deleteReservation(credentials);
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}


