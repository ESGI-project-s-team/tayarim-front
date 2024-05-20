"use server";
import {updateOwner} from "@/utils/apiOwner";
import {updateAdmin} from "@/utils/apiAdmin";


export async function updateOwnerInFun(credentials: any) {
    try {
        return await updateOwner(credentials);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function updateAdminInFun(credentials: any) {
    try {
        return await updateAdmin(credentials);
    } catch (error: any) {
        return {errors: error};
    }
}
