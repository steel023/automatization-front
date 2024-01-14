import React, {useMemo, useState} from 'react';
import {Incident} from "../../../models/Incident.ts";
import Card from "../../../ui/Card.tsx";
import IncidentCard from "./IncidentCard.tsx";
import {Button, Textarea, TextInput} from "@tremor/react";
import Modal from "../../../ui/Modal.tsx";
import {User} from "../../../models/User.ts";
import {useIncidentsStore} from "../store.ts";
import {createIncident, editIncident} from "../http";
import {PlusIcon} from "@heroicons/react/20/solid";

function IncidentList() {
    const [modalShown, setModalShown] = useState(false);

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');

    const userRole = useMemo(() => {
        const userRaw = localStorage.getItem("user");
        if (!userRaw) return 0;
        const user = JSON.parse(userRaw) as User;

        return user.role;
    }, []);

    const {incidents, setIncidents} = useIncidentsStore();

    function handleCreate() {
        const update = async () => {
            const res = await createIncident(title, summary);
            setIncidents([...incidents, {id: res.data.id, registration_date: '', incident_type: title, summary: summary}]);
            setModalShown(false);
        }

        update().catch((e) => {
            console.log(e);
        })
    }

    return (
        <div>
            <div className="mb-8 flex justify-between">
                <div className="text-lg font-bold">Инциденты</div>
                {(userRole == 2) && <Button icon={PlusIcon} onClick={() => {setModalShown(true)}}>Добавить инцидент</Button>}
            </div>
            <div className="grid grid-cols-3 gap-8">
                {incidents.map((el, i) => {
                    return <IncidentCard key={i} incident={el}/>;
                })}
            </div>
            <>
                {(userRole == 2) && <Modal widthClass="max-w-xl" shown={modalShown} close={() => {setModalShown(false)}}>
                    <div className="text-center text-lg font-bold mb-8">Добавить инцидент</div>
                    <TextInput
                        onChange={(event) => setTitle(event.target.value)}
                        className="mb-4"
                        placeholder="Название"
                        value={title}
                    />
                    <Textarea
                        onChange={(event) => setSummary(event.target.value)}
                        className="mb-4"
                        placeholder="Описание"
                        value={summary}
                    />
                    <Button className="w-full" onClick={handleCreate}>Готово</Button>
                </Modal>}
            </>
        </div>
    );
}

export default IncidentList;