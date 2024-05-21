"use server";
import {deleteOwner} from "@/utils/apiOwner";


export async function deleteOwnerInFun(credentials: any) {
    try {
        return await deleteOwner(credentials);
    } catch (error: any) {
        throw new Error(error);
    }
}
