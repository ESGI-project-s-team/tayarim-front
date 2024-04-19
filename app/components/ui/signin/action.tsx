"use server";
import apiAuthProvider from "@/utils/api";


export async function signInFun(credentials :any) {
    try {
        await apiAuthProvider(credentials);
    } catch (error) {
        console.error("Login failed:", error);
    }
}
