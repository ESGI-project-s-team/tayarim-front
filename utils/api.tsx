import {BACKEND_API} from "@/utils/constants";
import {da} from "date-fns/locale";

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
        //verify jwt access token
        // const decoded = jwt.verify(data.accessToken, process.env.JWT_SECRET);
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

