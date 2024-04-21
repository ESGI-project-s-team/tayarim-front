import {BACKEND_API} from "@/utils/constants";

const loginUrl = `${BACKEND_API}/proprietaires/login`

export default async function apiAuthProvider(credentials: any) {
    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();

        if (data.error) {
            return {error: data.message};
        }

        const userID = data.id;
        return {...data, userID};
    } catch (error: any) {
        console.log(error)
        return {error: error.message};
    }
}

