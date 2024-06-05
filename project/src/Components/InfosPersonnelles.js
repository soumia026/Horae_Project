import React, { useState } from "react";
import { LineInfos } from "./LineInfos";
import { Modules } from "./Modules";
import { AbsenceLine } from "./AbsenceLine";
import axios from 'axios';

export const InfosPersonnelles = (props) => {

    const [updateAbsence, setUpdateAbsence] = useState(null);

    const [deleteAbsence, setDeleteAbsence] = useState(null);

    const handleDeleteAbsence = (IdAbs) => {
        setDeleteAbsence(IdAbs)
    }

    return (
        <div className="infos-box">
            <div className="enseignant-infos data-container">
                <p className='title'>informations</p>
                <div className="table-container">
                    <div className="infos-table">
                        <table className="enseignant-infos-table">
                            <LineInfos
                                firstTitle={"matricule"}
                                firstValue={props.enseignant.Matricule}
                                style1={'uppercase'}
                                secondTitle={"adresse email"}
                                secondValue={props.enseignant.Email}
                                style2={'lowercase'}
                                thirdTitle={"date de naissance"}
                                thirdValue={props.enseignant.DateNaissance}
                                fourthTitle={"numéro telephone"}
                                fourthValue={props.enseignant.NumeroTelephone}
                            />
                            <LineInfos
                                firstTitle={"adresse"}
                                firstValue={props.enseignant.Adresse}
                                secondTitle={"grade"}
                                secondValue={props.enseignant.Grade}
                                thirdTitle={"fonction"}
                                thirdValue={props.enseignant.Fonction}
                                fourthTitle={"etablissement"}
                                fourthValue={props.enseignant.Etablissement}
                            />

                            <Modules
                                modules={props.modules}
                            />
                        </table>

                    </div>
                </div>
            </div>

            <div className="data-container Abscences-container">
                <p className='title'>absences</p>
                <div className="table-container">
                    <div className="infos-table">
                        <table className="abscences-table">
                            {props.absences.map((absence) => (
                                <AbsenceLine
                                    firstTitle={"date"}
                                    firstValue={absence.DateAbs}
                                    secondTitle={"heure debut"}
                                    secondValue={absence.HeureDebut.substring(0, 5)}
                                    thirdTitle={"heure fin"}
                                    thirdValue={absence.HeureFin.substring(0, 5)}
                                    fourthTitle={"motif"}
                                    fourthValue={absence.Motif}
                                    handleAbsence={() => setUpdateAbsence(absence)}
                                    handleDeleteAbsence={() => handleDeleteAbsence(absence.IdAbs)}
                                />
                            ))}

                        </table>

                    </div>
                </div>
            </div>

            {updateAbsence &&
                <ModifierAbsence absence={updateAbsence}
                    annulerUpdate={() => setUpdateAbsence(null)}
                />
            }

            {deleteAbsence &&
                <SupprimerAbsence
                    anullerSupprimerAbsence={() => setDeleteAbsence(null)}
                    Matricule={props.enseignant.Matricule}
                    IdAbs={deleteAbsence}
                />
            }

        </div>
    )
}

//------------------Modifier Absence Interface-------------------//

const ModifierAbsence = (props) => {
    const [updatedAbsence, setUpdatedAbsence] = useState({
        IdAbs: props.absence.IdAbs,
        DateAbs: props.absence.DateAbs,
        HeureDebut: props.absence.HeureDebut,
        HeureFin: props.absence.HeureFin,
        Motif: props.absence.Motif,
        IdProf: props.absence.IdProf
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/Administration/updateAbsence/${updatedAbsence.IdAbs}/`, updatedAbsence)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    };


    return (
        <div className="container-update-absence">
            <h2>modifier absence</h2>
            <div className="line-decoration" />
            <form onSubmit={handleSubmit}>
                <div className="input-line">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        value={updatedAbsence.DateAbs}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, DateAbs: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureDebut">heure debut</label>
                    <input
                        type="time"
                        value={updatedAbsence.HeureDebut}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, HeureDebut: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureFin">heure fin</label>
                    <input
                        type="time"
                        value={updatedAbsence.HeureFin}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, HeureFin: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="motif">motif</label>
                    <select
                        className="options"
                        value={updatedAbsence.Motif.toLowerCase()}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, Motif: e.target.value })}>
                        <option value="maladie">maladie</option>
                        <option value="voyage">voyage</option>
                        <option value="etude">etude</option>
                    </select>
                </div>
                <div className="update-absence-btns">
                    <button onClick={() => {
                        props.annulerUpdate();
                    }}>Annuler</button>
                    <button className='sauvegarder-absence'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </div>
    )
}

const SupprimerAbsence = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:8000/Administration/deleteAbsence/${props.Matricule}/${props.IdAbs}/`)
            .then((res) => {
                console.log('rr')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <form className="form-supprimer-absence" onSubmit={handleSubmit}>
            <div className="container-supprimer-profile">
                <div className="warning-circle">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4993 32.0832C25.5535 32.0832 32.0827 25.554 32.0827 17.4998C32.0827 9.44568 25.5535 2.9165 17.4993 2.9165C9.4452 2.9165 2.91602 9.44568 2.91602 17.4998C2.91602 25.554 9.4452 32.0832 17.4993 32.0832Z" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 11.6667V17.5" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 23.3333H17.5138" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <p>Est ce que vous etes sur de la suppression de cette absence?</p>
                <div className="supprimer-profile-btns">
                    <button className="annuler" onClick={() => props.anullerSupprimerAbsence()}>Annuler</button>
                    <button type="submit" className="supprimer">Supprimer</button>
                </div>
            </div>
        </form>
    )
}
