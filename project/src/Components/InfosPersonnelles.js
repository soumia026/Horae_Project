import React, { useState, useEffect } from "react";
import { LineInfos } from "./LineInfos";
import {Modules} from "./Modules";
import { AbsenceLine } from "./AbsenceLine";
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom"
export const InfosPersonnelles = (props) => {


    const [updateAbsence, setUpdateAbsence] = useState(null);
    
    return (
        <div className="infos-box">
            <div className="enseignant-infos data-container">
                <p className='title'>infos</p>
                <div className="table-container">
                    <div className="infos-table">
                        <table className="enseignant-infos-table">
                            <LineInfos
                                firstTitle={"matricule"}
                                firstValue={props.enseignant.Matricule}
                                secondTitle={"adresse email"}
                                secondValue={props.enseignant.Email}
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
                                    deletedObject = {absence.IdAbs}
                                />
                            ))}

                        </table>

                    </div>
                </div>
            </div>

            {updateAbsence &&
                <ModifierAbsence absence={updateAbsence}
                    annulerUpdate={() => setUpdateAbsence(null)}
                />}

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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/Administration/updateAbsence/${updatedAbsence.IdAbs}/` , updatedAbsence)
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
                    <button onClick={() =>{ 
                        props.annulerUpdate();
                        }}>Annuler</button>
                    <button className='sauvegarder-absence'
                     type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </div>
    )
}
