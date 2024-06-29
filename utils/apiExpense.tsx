"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";

const getAllDepensesUrl = `${BACKEND_API}/depenses`
const createDepensesUrl = `${BACKEND_API}/depenses`
const updateDepensesUrl = `${BACKEND_API}/depenses`
const deleteDepensesUrl = `${BACKEND_API}/depenses`


export async function getAllDepenses() {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getAllDepensesUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function createDepenses(data: any) {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(createDepensesUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (!response.ok) {
            if (responseData.errors) {
                return {errors: responseData.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return responseData;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function updateDepenses(data: any) {
    const token = cookies().get("token")?.value;
    let url = `${updateDepensesUrl}/${data.id.toString()}`
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (!response.ok) {
            if (responseData.errors) {
                return {errors: responseData.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return responseData;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function deleteDepenses(id: any) {
    const token = cookies().get("token")?.value;
    let url = `${deleteDepensesUrl}/${id.toString()}`
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        if (!response.ok) {
            if (responseData.errors) {
                return {errors: responseData.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return responseData;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}