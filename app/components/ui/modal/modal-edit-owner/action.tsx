"use server";
import {updateOwner} from "@/utils/apiOwner";


export async function updateOwnerInFun(credentials: any) {
    try {
        return await updateOwner(credentials);
    } catch (error: any) {
        throw new Error(error);
    }
}
