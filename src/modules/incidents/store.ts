import { create } from 'zustand'
import {Incident} from "../../models/Incident";
import {compareIncidents} from "../../utils/arrays.ts"

type State = {
    incidents: Incident[]
}

type Action = {
    setIncidents: (newIncidents: State['incidents']) => void
    updateIncident: (newIncident: Incident) => void
}

export const useIncidentsStore = create<State & Action>((set) => ({
    incidents: [],
    setIncidents: (newIncidents: Incident[]) => set(() => ({incidents: newIncidents.sort(compareIncidents)})),
    updateIncident: (newIncident: Incident) => set((state) => {
        const indexOfUpdatedIncident = state.incidents.indexOf(newIncident);
        const filteredIncidents = state.incidents.filter((el) => el.id != newIncident.id);
        return {incidents: [...filteredIncidents.slice(0, indexOfUpdatedIncident), newIncident, ...filteredIncidents.slice(indexOfUpdatedIncident)].sort(compareIncidents)};
    }),
}))