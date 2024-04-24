"use server";
import {logout} from "@/utils/apiAuth";


export async function logoutInFun() {
    try {
        return await logout();
    } catch (error: any) {
        throw new Error(error);
    }
}
