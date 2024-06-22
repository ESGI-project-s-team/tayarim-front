"use server";
import {getAllReservations} from "@/utils/apiReservation";
import {getByIdHousing} from "@/utils/apiHousing";


export async function getAllReservationsInFun() {
    try {
        return await getAllReservations();
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function getByIdHousingInFun(id: number) {
    try {
        return await getByIdHousing(id.toString());
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}


