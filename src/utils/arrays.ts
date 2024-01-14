import {Incident} from "../models/Incident.ts";

export function compareIncidents(a: Incident, b:Incident) {
    if ( a.id < b.id ){
        return -1;
    }
    if ( a.id > b.id ){
        return 1;
    }
    return 0;
}
