"use server";
import {checkToken, login} from "@/utils/apiAuth";


export async function signInFun(credentials: any) {
    try {
        return await login(credentials);
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

export async function checkTokenInFun() {
    try {
        return await checkToken();
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}
