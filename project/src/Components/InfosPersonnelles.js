import React, { useState, useEffect } from "react";
import { LineInfos } from "./LineInfos";
import { AbsenceLine } from "./AbsenceLine";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
export const InfosPersonnelles = (props) => {

    const [absences, setAbsences] = useState([]);

    //pour mise a jour les abscences si li ya une modification

    const updateListeAbsences = () =>{
       axios.get('http://localhost:3000/absences')
       .then(res =>{
        setAbsences(res.data.filter(absence => absence.matricule === props.enseignant.id))
       })
       .catch(err => console.log(err))
    }

    useEffect(() => {
        const fetchAbsences = async () => {
            try {
                const response = await axios.get('http://localhost:3000/absences');
                const filteredAbsences = response.data.filter(absence => absence.matricule === props.enseignant.id);
                setAbsences(filteredAbsences);
                console.log(filteredAbsences);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAbsences();
    }, []);

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
                                firstValue={props.enseignant.id}
                                secondTitle={"adresse email"}
                                secondValue={props.enseignant.email}
                                thirdTitle={"date de naissance"}
                                thirdValue={props.enseignant.dateNaissance}
                                fourthTitle={"numéro telephone"}
                                fourthValue={props.enseignant.numTelephone}
                            />
                            <LineInfos
                                firstTitle={"adresse"}
                                firstValue={props.enseignant.adress}
                                secondTitle={"grade"}
                                secondValue={props.enseignant.grade}
                                thirdTitle={"numéro compte"}
                                thirdValue={props.enseignant.numCompte}
                                fourthTitle={"etablissement"}
                                fourthValue={props.enseignant.etablissement}
                            />

                            {/* <Modules
                                modules={props.enseignant.modules}
                                fonctions={props.enseignant.fonction}
                            /> */}
                        </table>

                    </div>
                </div>
            </div>

            <div className="data-container Abscences-container">
                <p className='title'>absences</p>
                <div className="table-container">
                    <div className="infos-table">
                        <table className="abscences-table">
                            {absences.map((absence) => (
                                <AbsenceLine
                                    firstTitle={"date"}
                                    firstValue={absence.date_absence}
                                    secondTitle={"heure debut"}
                                    secondValue={absence.heureDebut}
                                    thirdTitle={"heure fin"}
                                    thirdValue={absence.heureFin}
                                    fourthTitle={"motif"}
                                    fourthValue={absence.motif}
                                    handleAbsence={() => setUpdateAbsence(absence)}
                                    deletedObject = {absence.id}
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
        id: props.absence.id,
        matricule: props.absence.matricule,
        date_absence: props.absence.date_absence,
        heureDebut: props.absence.heureDebut,
        heureFin: props.absence.heureFin,
        motif: props.absence.motif
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/absences/' + props.absence.id, updatedAbsence)
            .then(res => {
                navigate('/admin');
            })
            .catch(err => console.log(err));
    };
    const handleReload = () => {
        window.location.reload(); // Reload the page
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
                        value={updatedAbsence.date_absence}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, date_absence: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureDebut">heure debut</label>
                    <input
                        type="time"
                        value={updatedAbsence.heureDebut}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, heureDebut: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureFin">heure fin</label>
                    <input
                        type="time"
                        value={updatedAbsence.heureFin}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, heureFin: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="motif">motif</label>
                    <select
                        className="options"
                        value={updatedAbsence.motif.toLowerCase()}
                        onChange={(e) => setUpdatedAbsence({ ...updatedAbsence, motif: e.target.value })}>
                        <option value="malade">maladie</option>
                        <option value="voyage">voyage</option>
                        <option value="etude">etude</option>
                    </select>
                </div>
                <div className="update-absence-btns">
                    <button onClick={() =>{ 
                        props.annulerUpdate();
                        }}>Annuler</button>
                    <button className='sauvegarder-absence'
                     type="submit" onClick={() => handleReload()} > Sauvegarder</button>
                </div>
            </form>
        </div>
    )
}
