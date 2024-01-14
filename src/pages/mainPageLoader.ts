import {redirect} from "react-router-dom";
import {getAllIncidents} from "../modules/incidents";

export async function mainLoader() {
    if (!localStorage.getItem("access_token")) {
        return redirect("/auth/login");
    }

    try {
        const incidents = await getAllIncidents();
        return incidents.data
    } catch (e: any) {
        throw new Response("something_went_wrong", { status: 500 });
    }
}