"use server";
import {login} from "@/utils/apiAuth";


export async function signInFun(credentials: any) {
    try {
        return await login(credentials);
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}
