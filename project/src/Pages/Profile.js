import React, { useState, useEffect } from "react";
import '../Styles/Profinfos.css'
import axios from "axios";
import { teacher } from "../Constructors";
import { useParams } from 'react-router-dom';
import { ChargeHoraire } from "../Components/ChargeHoraire";
import { LineInfos } from "../Components/LineInfos";
import { Modules } from "../Components/Modules";
import { Comptabilite } from "../Components/Comptabilite";

export function Profile() {

    const { matricule } = useParams();

    const [enseignant, setEnseignant] = useState(new teacher(matricule));

    const [absences, setAbsences] = useState([]);

    const [modules, setModules] = useState([]);

    const [seances, setSeances] = useState([]);

    const comparerParJour = (a, b) => {
        if (a.Jour < b.Jour) {
            return -1;
        }
        if (a.Jour > b.Jour) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uri = `http://127.0.0.1:8000/Administration/teachinfos/${matricule}/?format=json`; // Construct the URI with proper URL encoding
                console.log("URI:", uri); // Log the URI
                const response = await axios.get(uri); // Make the HTTP request
                setEnseignant(response.data.teacher);
                setAbsences(response.data.absences);
                setModules(response.data.modules);
                setSeances(response.data.seances.sort(comparerParJour))
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [matricule]);


    const btns = [
        {
            title: "infos personnelles",
            component: <InfosPersonnelles1 enseignant={enseignant} absences={absences} modules={modules} />,
        },
        {
            title: "charge horaire",
            component: <ChargeHoraire seances={seances} modifierSeanceOn = {false} />,
        },
        {
            title: "comptabilité",
            component:<Comptabilite Matricule = {enseignant.Matricule} Nom = {enseignant.Nom} Prenom = {enseignant.Prénom} Grade = {enseignant.Grade} />,
        },
    ]


    const [clickedButton, setClickedButon] = useState(0);

    const toggle = (index) => {
        setClickedButon(index === clickedButton ? null : index)
    }

   
    return (
        <div className="main-container dynamic-container prof-infos-container">
            <div className="profile-flex-container">
            </div>
            <div className="buttons-container">
                <div className="infos-butns">
                    {btns.map((btn, index) => (
                        <button onClick={() => toggle(index)} className={index === clickedButton ? 'clicked' : null}>{btn.title}</button>
                    ))}
                </div>
            </div>
            {btns[clickedButton].component}

        </div >
    )
}

//----------------Components----------------------//

const AbsenceLine1 = (props) => {

    return (

        <tr>
            <td>
                <span>{props.firstTitle}</span>
                <p>{props.firstValue}</p>
            </td>
            <td>
                <span>{props.secondTitle}</span>
                <p>{props.secondValue}</p>
            </td>
            <td>
                <span>{props.thirdTitle}</span>
                <p>{props.thirdValue}</p>
            </td>
            <td>
                <span>{props.fourthTitle}</span>
                <p>{props.fourthValue}</p>
            </td>
        </tr>
    )
}

//----------------Interfaces -------------------//


const InfosPersonnelles1 = (props) => {
    
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
                                <AbsenceLine1
                                    firstTitle={"date"}
                                    firstValue={absence.DateAbs}
                                    secondTitle={"heure debut"}
                                    secondValue={absence.HeureDebut.substring(0, 5)}
                                    thirdTitle={"heure fin"}
                                    thirdValue={absence.HeureFin.substring(0, 5)}
                                    fourthTitle={"motif"}
                                    fourthValue={absence.Motif}
                                />
                            ))}

                        </table>

                    </div>
                </div>
            </div>

        </div>
    )
}

