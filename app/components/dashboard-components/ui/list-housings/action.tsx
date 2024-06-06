"use server";
import {getAllOwners, getByIdOwner} from "@/utils/apiOwner";


export async function getAllOwnersInFun() {
    try {
        return await getAllOwners();
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function getOwnerById(id : string) {
    try {
        return await getByIdOwner(id);
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}
