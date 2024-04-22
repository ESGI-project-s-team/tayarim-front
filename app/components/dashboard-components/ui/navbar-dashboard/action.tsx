"use server";
import {logout} from "@/utils/apiAuth";


export async function logoutInFun() {
    try {
        return await logout();
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}
