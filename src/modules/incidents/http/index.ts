import $api from "../../../http";
import {AxiosResponse} from "axios";
import {Incident} from "../../../models/Incident.ts";

export function getAllIncidents(): Promise<AxiosResponse<Incident[]>> {
    return $api.get<Incident[]>('incidents');
}

export function createIncident(title: string, summary: string): Promise<AxiosResponse<Incident>> {
    return $api.post<Incident>(`incidents`, {
        incident_type: title,
        summary: summary,
    });
}

export function editIncident(id:string, title: string, summary: string): Promise<AxiosResponse<Incident>> {
    return $api.put<Incident>(`incidents/${id}`, {
        incident_type: title,
        summary: summary,
    });
}

export function deleteIncident(id:string): Promise<AxiosResponse> {
    return $api.delete(`incidents/${id}`);
}