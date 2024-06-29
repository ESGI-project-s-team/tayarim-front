"use server";
import {getAllOwners} from "@/utils/apiOwner";
import {
    createHousingApi,
    getHousingAmenities,
    getHousingRules,
    getHousingTypes
} from "@/utils/apiHousing";


export async function getAllOwnerInFun() {
    try {
        return await getAllOwners();
    } catch (error: any) {
        return {errors: error};
    }
}

export async function createHouseInFun(formData: any) {
    try {
        return await createHousingApi(formData);
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

export async function getHousingRulesInFun() {
    try {
        return await getHousingRules();
    } catch (error: any) {
        return {errors: error};
    }
}

export async function getHousingAmenitiesInFun() {
    try {
        return await getHousingAmenities();
    } catch (error: any) {
        return {errors: error};
    }
}




