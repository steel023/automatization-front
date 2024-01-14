import React, {useMemo, useState} from 'react';
import {Incident} from "../../../models/Incident.ts";
import Card from "../../../ui/Card.tsx";
import {User} from "../../../models/User.ts";
import {Button, Icon, Textarea, TextInput} from "@tremor/react";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid";
import Modal from "../../../ui/Modal.tsx";
import {useIncidentsStore} from "../store.ts";
import {deleteIncident, editIncident} from "../http";

type IncidentCardProps = {
    incident: Incident
}

function IncidentCard({incident}: IncidentCardProps) {
    const [editModalShown, setEditModalShown] = useState(false);
    const [deleteModalShown, setDeleteModalShown] = useState(false);

    const [title, setTitle] = useState(incident.incident_type);
    const [summary, setSummary] = useState(incident.summary);

    const userRole = useMemo(() => {
        const userRaw = localStorage.getItem("user");
        if (!userRaw) return 0;
        const user = JSON.parse(userRaw) as User;

        return user.role;
    }, []);

    const {updateIncident, setIncidents, incidents} = useIncidentsStore();

    function handleDelete() {
        const remove = async () => {
            await deleteIncident(incident.id);
            setIncidents([...incidents.filter((el) => el.id != incident.id)]);
            setDeleteModalShown(false);
        }

        remove().catch((e) => {
            console.log(e);
        })
    }

    function handleEdit() {
        const update = async () => {
            await editIncident(incident.id, title, summary);
            updateIncident({...incident, incident_type: title, summary: summary});
            setEditModalShown(false);
        }

        update().catch((e) => {
            console.log(e);
        })
    }

    return (
        <Card>
            <div className="font-bold mb-2 flex justify-between items-center">
                {incident.incident_type}
                <div>
                    {(userRole != 0) && <div>
                        <Icon
                            onClick={() => {
                                setEditModalShown(true);
                            }}
                            className="cursor-pointer"
                            icon={PencilSquareIcon}
                            size="sm"
                            color="slate"
                        />
                        {(userRole == 2) &&
                            <Icon
                                onClick={() => {
                                    setDeleteModalShown(true);
                                }}
                                className="cursor-pointer pr-0"
                                icon={TrashIcon}
                                size="sm"
                                color="slate"
                            />
                        }
                    </div>}
                </div>
            </div>
            <div className="text-sm text-slate-500">{incident.summary}</div>
            <>
                {(userRole != 0) && <>
                        <Modal key={incident.id} widthClass="max-w-xl" shown={editModalShown} close={() => {setEditModalShown(false)}}>
                            <div className="text-center text-lg font-bold mb-8">Редактировать инцидент</div>
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
                            <Button className="w-full" onClick={handleEdit}>Готово</Button>
                        </Modal>
                        <Modal widthClass="max-w-xl" shown={deleteModalShown} close={() => {setDeleteModalShown(false)}}>
                            <div className="text-center text-lg font-bold mb-8">Удалить инцидент</div>
                            <div className="text-center text-sm">Вы уверены, что хотите удалить инцидент?</div>
                            <div className="mt-8 text-center flex items-center justify-center">
                                <Button onClick={() => {setDeleteModalShown(false)}} className="mr-2">Отмена</Button>
                                <Button onClick={handleDelete} color="red">Да, удалить</Button>
                            </div>
                        </Modal>
                    </>
                }
            </>
        </Card>
    );
}

export default IncidentCard;