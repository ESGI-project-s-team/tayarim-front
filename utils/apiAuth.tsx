import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const loginUrl = `${BACKEND_API}/proprietaires/login`
const checkTokenUrl = `${BACKEND_API}/proprietaires/auth`
const logoutUrl = `${BACKEND_API}/proprietaires/logout`

export async function login(credentials: any) {
    try {
        const response = await fetch(loginUrl, {
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

export async function logout(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(logoutUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {

            const data = await response.json();
            if (data.errors) {
                return {error: data.errors};
            }

        }
        cookies().delete("token");
        return true;
    } catch (error: any) {
        return {error: error.message};
    }

}

export async function checkToken() {
    console.log('isProtectedRoute')
    const token = cookies().get("token")?.value;
    if (!token) {
        return false;
    }
    try {
        const response = await fetch(checkTokenUrl, {
            method: "POST",
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

