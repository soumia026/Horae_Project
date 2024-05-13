import React, {useState, useEffect} from "react";
import "../Styles/Emploi.css"
import axios from "axios";

export const ChargeHoraire = (props) => {

    const [sections, setSections] = useState({});
    const [groupes, setGroupes] = useState({});
    const [salles, setSalles] = useState({});
    const [modules, setModules] = useState({});

    useEffect(() => {
        const fetchSections = async () => {
            const sectionsData = {};
            for (const seance of props.seances) {
                try {
                    const section = await recupererSection(seance.idSection);
                    sectionsData[seance.idSection] = section;
                } catch (error) {
                    console.log(error);
                }
            }
            setSections(sectionsData);
        };

        fetchSections();

        const fetchGroupes = async () => {
            const groupesData = {};
            for (const seance of props.seances) {
                try {
                    const groupe = await recupererGroupe(seance.idGroupe);
                    groupesData[seance.idSection] = groupe;
                } catch (error) {
                    console.log(error);
                }
            }
            setGroupes(groupesData);
        };

        fetchGroupes();

        const fetchSalles = async () => {
            const SallesData = {};
            for (const seance of props.seances) {
                try {
                    const salle = await recupererSalle(seance.idSalle);
                    SallesData[seance.idSalle] = salle;
                } catch (error) {
                    console.log(error);
                }
            }
            setSalles(SallesData);
        };

        fetchSalles();

        const fetchModules = async () => {
            const modulesData = {};
            for (const seance of props.seances) {
                try {
                    const module = await recupererModule(seance.Code);
                    modulesData[seance.Code] = module;
                } catch (error) {
                    console.log(error);
                }
            }
            setModules(modulesData);
        };

        fetchModules();
    }, [props.seances]);


    const recupererSection = async (section) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/Administration/section/${section}/`);
            return response.data.section.NomSection;
        } catch (err) {
            console.log(err);
            throw err;
        }
            
    };

    const recupererGroupe = async (groupe) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/Administration/groupe/${groupe}/`);
            return response.data.groupe.Numero;
        } catch (err) {
            console.log(err);
            throw err;
        }
            
    };

    const recupererSalle = async (salle) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/Administration/salle/${salle}/`);
            return response.data.salle.NomSalle;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const recupererModule = async (module) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/Administration/module/${module}/`);
            return response.data.module.NomModule;
        } catch (err) {
            console.log(err);
            throw err;
        }
            
    };

    return (
        <div className="infos-emploi-box">
            <div className="data-container">
                <p className='title'>emploi du temps</p>
                <div className="table-emploi-container">
                    <div className="infos-table">
                        <table className="emploi-temps-table">
                            {props.seances.map((seance) => (
                                <SeanceLine
                                   NomS = {seance.NomS}
                                   Jour = {seance.Jour}
                                   HeureDebut = {seance.HeureDebut.substring(0, 5)}
                                   HeureFin = {seance.HeureFin.substring(0, 5)}
                                   Module = {modules[seance.Code]}
                                   Section = {sections[seance.idSection]}
                                   groupe = {groupes[seance.idGroupe]}
                                   Promotion = {seance.idPromo}
                                   Salle = {salles[seance.idSalle]}
                                />
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

//---------components-------

const SeanceLine = (props) => {
    return (
        <tr>
            <td>
                <span>
                    nom sceance
                </span>
                <p>
                    {props.NomS}
                </p>
            </td>
            <td>
                <span>
                    jour
                </span>
                <p>
                    {props.Jour}
                </p>
            </td>
            <td>
                <span>
                    horaire
                </span>
                <p>
                    {props.HeureDebut}-{props.HeureFin}
                </p>
            </td>
            <td>
                <span>
                    module
                </span>
                <p>
                    {props.Module}
                </p>
            </td>
            <td>
                <span>
                    promotion
                </span>
                <p>
                    {props.Promotion}
                </p>
            </td>
            <td>
                <span>
                    Section
                </span>
                <p>
                    {props.Section}
                </p>
            </td>
            
            <td>
                <span>
                    groupe
                </span>
                <p>
                    {props.groupe ? props.groupe : '/'}
                </p>
            </td>
            <td>
                <span>
                    salle
                </span>
                <p>
                    {props.Salle}
                </p>
            </td>
            <td>
                <div className="update-seance">
                    <svg cursor={'pointer'} width="1rem" height="1rem" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_204_907)">
                            <path d="M12.041 2.12487C12.2271 1.93883 12.4479 1.79126 12.691 1.69058C12.9341 1.58989 13.1946 1.53807 13.4577 1.53807C13.7208 1.53807 13.9813 1.58989 14.2244 1.69058C14.4674 1.79126 14.6883 1.93883 14.8743 2.12487C15.0604 2.31091 15.208 2.53177 15.3086 2.77485C15.4093 3.01792 15.4612 3.27844 15.4612 3.54154C15.4612 3.80464 15.4093 4.06516 15.3086 4.30823C15.208 4.55131 15.0604 4.77217 14.8743 4.95821L5.31185 14.5207L1.41602 15.5832L2.47852 11.6874L12.041 2.12487Z" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_204_907">
                                <rect width="17" height="17" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg cursor={'pointer'} width="1rem" height="1rem" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.125 4.25H3.54167H14.875" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.4577 4.25001V14.1667C13.4577 14.5424 13.3084 14.9027 13.0428 15.1684C12.7771 15.4341 12.4167 15.5833 12.041 15.5833H4.95768C4.58196 15.5833 4.22162 15.4341 3.95595 15.1684C3.69027 14.9027 3.54102 14.5424 3.54102 14.1667V4.25001M5.66602 4.25001V2.83334C5.66602 2.45762 5.81527 2.09728 6.08095 1.8316C6.34662 1.56593 6.70696 1.41667 7.08268 1.41667H9.91602C10.2917 1.41667 10.6521 1.56593 10.9178 1.8316C11.1834 2.09728 11.3327 2.45762 11.3327 2.83334V4.25001" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.08398 7.79167V12.0417" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.91602 7.79167V12.0417" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

            </td>
        </tr>
    )
}