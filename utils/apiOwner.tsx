import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const getAllOwnersUrl = `${BACKEND_API}/proprietaires`
const createOwnerUrl = `${BACKEND_API}/proprietaires`
const getByIdOwnerUrl = `${BACKEND_API}/proprietaires/logout`
const updateOwnerUrl = `${BACKEND_API}/proprietaires`

export async function createOwner(credentials: any) {
    try {
        const response = await fetch(createOwnerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {error: data.errors};
            }
        }
        const userID = data.id;
        const token = data.token;
        cookies().set("token", token);
        return {...data, userID};
    } catch (error: any) {
        return {error: error.message};
    }
}

export async function updateOwner(credentials: any) {
    const token = cookies().get("token")?.value;
    const id = credentials.id.toString();
    //remove logements from credentials
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
        console.log(response);
        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                return {error: data.errors};
            }
        }
        return data;
    } catch (error: any) {
        return {error: error.message};
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
                return {error: data.errors};
            }
        }
        return data;
    } catch (error: any) {
        return {error: error.message};
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

