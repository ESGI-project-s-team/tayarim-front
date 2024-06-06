import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const updateAdminUrl = `${BACKEND_API}/admin`


export async function updateAdmin(credentials: any) {
    const token = cookies().get("token")?.value;
    const id = credentials.id.toString();

    let url = updateAdminUrl + "/" + id;
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
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

