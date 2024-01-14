import React, {useEffect} from 'react';
import {useLoaderData} from "react-router-dom";
import {Incident} from "../models/Incident.ts";
import {IncidentList} from "../modules/incidents";
import {useIncidentsStore} from "../modules/incidents/store.ts";

function MainPage() {
    const initialIncidents:Incident[] = useLoaderData() as Incident[];

    const {setIncidents} = useIncidentsStore();

    useEffect(() => {
        setIncidents(initialIncidents);
    }, [initialIncidents])

    return (
        <div className="mt-8">
            <IncidentList/>
        </div>
    );
}

export default MainPage;