"use server";
import {updateHousing} from "@/utils/apiHousing";

export async function updateHousingInFun(body: any) {
    try {
        return await updateHousing(body);
    } catch (error: any) {
        return {errors: error};
    }
}





