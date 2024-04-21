"use server";
import apiAuthProvider from "@/utils/api";


export async function signInFun(credentials: any) {
    try {
        return await apiAuthProvider(credentials);
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}
