"use server";
import {getAllOwners} from "@/utils/apiOwner";
import {createHousing, getHousingTypes} from "@/utils/apiHousing";


export async function getAllOwnerInFun() {
    try {
        return await getAllOwners();
    } catch (error: any) {
        return {errors: error};
    }
}

export async function createHouseInFun(body: any) {
    try {
        return await createHousing(body);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function getHousingTypesInFun() {
    try {
        return await getHousingTypes();
    } catch (error: any) {
        return {errors: error};
    }
}




