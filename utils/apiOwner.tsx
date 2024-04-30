import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";
import {throws} from "node:assert";

const getAllOwnersUrl = `${BACKEND_API}/proprietaires`
const createOwnerUrl = `${BACKEND_API}/proprietaires`
const getByIdOwnerUrl = `${BACKEND_API}/proprietaires/logout`
const updateOwnerUrl = `${BACKEND_API}/proprietaires`
const deleteOwnerUrl = `${BACKEND_API}/proprietaires`

export async function createOwner(credentials: any) {
    const token = cookies().get("token")?.value;

    try {
        const response: any = await fetch(updateOwnerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(credentials),
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
        return Promise.reject(Error(error));
    }
}

export async function updateOwner(credentials: any) {
    const token = cookies().get("token")?.value;
    const id = credentials.id.toString();
    //remove logements from credentials
    //TODO DO NOT DELETE LOGEMENTS
    delete credentials.logements;
    const url = updateOwnerUrl + "/" + id;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: "error_occurred"};
        }
        return data;
    } catch (error: any) {
        return {errors: error};
    }
}

export async function getAllOwners(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getAllOwnersUrl + "?logement=true", {
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
            return {errors: "error_occurred"};
        }
        return data;
    } catch (error: any) {
        return {errors: error};
    }

}

export async function getByIdOwner(id: string): Promise<any> {
    const token = cookies().get("token")?.value;
    if (!token) {
        return false;
    }
    try {
        const response = await fetch(getByIdOwnerUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.ok;

    } catch (error: any) {
        return false;
    }
}

export async function deleteOwner(id: any) {
    const token = cookies().get("token")?.value;
    const url = deleteOwnerUrl + "/" + id.id;
    try {
        const response = await fetch(url, {
            method: "DELETE",
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
            return {errors: "error_occurred"};
        }
        return data;
    } catch (error: any) {
        return {errors: error};
    }
}
