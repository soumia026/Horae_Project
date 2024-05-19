import React, { useState, useEffect } from "react";
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
                if (seance.idGroupe !== null) { // Vérifiez si idGroupe n'est pas null
                    try {
                        const groupe = await recupererGroupe(seance.idGroupe);
                        groupesData[seance.idGroupe] = groupe;
                    } catch (error) {
                        console.log(error);
                    }
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

    const [semestre, setSemestre] = useState('Semestre 01');

    const filtredSeances = props.seances.filter((seance) => {
        if (semestre === 'Semestre 01') {
            return seance.Semestre === 'S1'
        } else {
            return seance.Semestre === 'S2'
        }
    })

    //seance a modifier

    const [modiferSeanceClicked, setModifiedSeanceClicked] = useState(null);

    return (
        <div className="infos-emploi-box">
            <div className="data-container">
                <div className="title-container">
                    <p className='title'>emploi du temps</p>
                    <div className="select-container">
                        <button className="select-btn">
                            {semestre}
                            <span>
                                <span><svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.131552 0.449026L4.2945 4.83737L8.42944 0.405733L8.43949 2.33171L4.30446 6.74534L0.1416 2.375L0.131552 0.449026Z" fill="black" />
                                </svg>
                                </span>
                            </span>
                        </button>
                        <select style={{ fontSize: '15.5px' }} onChange={(e) => setSemestre(e.target.value)}>
                            <option value={'Semestre 01'}>Semestre 01</option>
                            <option value={'Semestre 02'}>Semestre 02</option>
                        </select>
                    </div>
                </div>

                <div className="table-emploi-container">
                    <div className="infos-table">
                        <table className="emploi-temps-table">
                            {filtredSeances.map((seance) => (
                                <SeanceLine
                                    NomS={seance.NomS}
                                    Jour={seance.Jour}
                                    HeureDebut={seance.HeureDebut.substring(0, 5)}
                                    HeureFin={seance.HeureFin.substring(0, 5)}
                                    Module={modules[seance.Code]}
                                    Section={sections[seance.idSection]}
                                    Promotion={seance.idPromo}
                                    groupe={groupes[seance.idGroupe]}
                                    Salle={salles[seance.idSalle]}
                                    modiferSeance={props.modiferSeanceOn}
                                    modiferSeanceOn={() => setModifiedSeanceClicked(seance)}
                                />
                            ))}
                        </table>
                    </div>
                </div>
            </div>
            {modiferSeanceClicked &&
                <ModifierSeance
                    anullerModifierSeance={() => setModifiedSeanceClicked(null)}
                    seance={modiferSeanceClicked}
                    modules={modules}
                />
            }
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

            {props.modiferSeance &&
                <td>
                    <div className="update-seance">
                        <svg cursor={'pointer'} onClick={() => props.modiferSeanceOn()} width="1rem" height="1rem" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            }

        </tr>
    )
}

//----------Modifier Seance---------------//

const ModifierSeance = (props) => {

    const [salles, setSalles] = useState([]);

    useEffect(() => {


        const fetchData = () => {
            axios.get('http://127.0.0.1:8000/Administration/salles')
                .then((res => {
                    setSalles(res.data);
                }))
                .catch((err) => { console.log(err) })
        }

        fetchData();

    }, []);

    //-------Sections-------

    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchData1 = () => {
            axios.get('http://127.0.0.1:8000/Administration/sections')
                .then((res) => {
                    setSections(res.data)
                })
                .catch((err) => { console.log(err) })
        }

        fetchData1();

    }, []);

    const [selectedPromo, setSeelctedPromo] = useState(props.seance.idPromo)

    const filteredSections = sections.filter((section) => section.nomP === selectedPromo)

    const [selectedCycle, setSelectedCycle] = useState(""); // Correction : selectedCycle

    useEffect(() => {
        const handleSelectChange = () => {
            const selectedValue = selectedPromo;
            if (selectedValue === "1CPI" || selectedValue === "2CPI") {
                setSelectedCycle('Classe préparatoire');
            } else {
                setSelectedCycle('Seconde Cycle');
            }
        };

        handleSelectChange();
    }, []);

    const handleZoneChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "1CPI" || selectedValue === "2CPI") {
            setSelectedCycle('Classe préparatoire');
        } else {
            setSelectedCycle('Seconde Cycle');
        }
    }

    const filteredSalles = salles.filter((salle) => salle.Zone === selectedCycle);


    //----------groupes----------

    const [groupes, setGroupes] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/Administration/groupes')
            .then((res) => {
                setGroupes(res.data)
            })
            .catch((err) => { console.log(err) })

    }, []);

    const [selectedSection, setSelectedSection] = useState(props.seance.idSection);

    const filteredGroupes = groupes.filter((groupe) => groupe.idSection === parseInt(selectedSection));

    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
        setInputType('time');
    };

    const handleBlur = () => {
        setInputType('text');
    };

    const [inputType1, setInputType1] = useState('text');

    const handleFocus1 = () => {
        setInputType1('time');
    };

    const handleBlur1 = () => {
        setInputType1('text');
    };

    const [appearGroupe, setAppearGroup] = useState(false);

    const handleChange = (e) => {
        const selectedType = e.target.value;

        if (selectedType === 'Cours') {
            setAppearGroup(false)
        } else if (selectedType === 'Tp' || selectedType === 'Td') {
            setAppearGroup(true)
        }
    }

    const moduleEntries = Object.entries(props.modules);

    // Reformater les paires clé-valeur en objets avec des propriétés Code et NomModule
    const moduleObjects = moduleEntries.map(([code, nomModule]) => ({
        Code: code,
        NomModule: nomModule
    }));

    const [modifiedSeance, setModifiedSeance] = useState({
        IdSeance: props.seance.IdSeance,
        NomS: props.seance.NomS,
        Type: props.seance.Type,
        Jour: props.seance.Jour,
        HeureDebut: props.seance.HeureDebut,
        HeureFin: props.seance.HeureFin,
        Semestre: props.seance.Semestre,
        Matricule: props.seance.Matricule,
        Code: props.seance.Code,
        idSalle: props.seance.idSalle,
        idPromo: props.seance.idPromo,
        idGroupe: props.seance.idGroupe,
        idSection: props.seance.idSection
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/Administration/updateSeance/${modifiedSeance.IdSeance}/`, modifiedSeance)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            alert(err.response.data.error)
        })
    }

    return (
        <div className="modifier-seance-container">
            <h2 className="ajouter-enseignant-title" style={{ textTransform: 'capitalize' }}>modifier séance</h2>
            <div className="line-decoration" />
            <form className="ajouter-enseignant-form" onSubmit={handleSubmit}>
                <div className="input-line">
                    <label htmlFor="NomS">nom séance</label>
                    <input
                        required
                        value={modifiedSeance.NomS}
                        onChange={(e) => setModifiedSeance({ ...modifiedSeance, NomS: e.target.value })}
                        type="text"
                    />
                </div>

                <div className="input-line">
                    <label htmlFor="type">type scéance</label>
                    <select
                        required
                        value={modifiedSeance.Type}
                        onChange={(e) => { handleChange(e); setModifiedSeance({ ...modifiedSeance, Type: e.target.value }) }}
                    >
                        <option value={"default"}></option>
                        <option value={"Cours"}>cours</option>
                        <option value={"Td"}>TD</option>
                        <option value={"Tp"}>TP</option>
                    </select>
                </div>

                <div className="input-line">
                    <label htmlFor="jour">jour</label>
                    <select
                        required
                        value={modifiedSeance.Jour}
                        onChange={(e) => setModifiedSeance({ ...modifiedSeance, Jour: e.target.value })}
                    >
                        <option value={"default"}> </option>
                        <option value={"Dimanche"}>dimanche</option>
                        <option value={"Lundi"}>lundi</option>
                        <option value={"Mardi"}>mardi</option>
                        <option value={"Mercredi"}>mercredi</option>
                        <option value={"Jeudi"}>jeudi</option>
                    </select>
                </div>

                <div className="input-line">
                    <label htmlFor="heureDebut">heure debut</label>
                    <input
                        required
                        value={modifiedSeance.HeureDebut.substring(0,5)}
                        onChange={(e) => setModifiedSeance({ ...modifiedSeance, HeureDebut: e.target.value })}
                        type={inputType} placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="input-line">
                    <label htmlFor="HeureFin">heure fin</label>
                    <input
                        required
                        value={modifiedSeance.HeureFin.substring(0,5)}
                        onChange={(e) => setModifiedSeance({ ...modifiedSeance, HeureFin: e.target.value })}
                        type={inputType1} placeholder=""
                        onFocus={handleFocus1}
                        onBlur={handleBlur1}
                    />
                </div>

                <div className="input-line">
                    <label htmlFor="promotion">promotion</label>
                    <select
                        required
                        value={modifiedSeance.idPromo}
                        onChange={(e) => { setSeelctedPromo(e.target.value); handleZoneChange(e); setModifiedSeance({...modifiedSeance, idPromo: e.target.value}) }}
                    >
                        <option value={"default"}> </option>
                        <option value={"1CPI"}>1CPI</option>
                        <option value={"2CPI"}>2CPI</option>
                        <option value={"1CS"}>1CS</option>
                        <option value={"2CS"}>2CS</option>
                        <option value={"3CS"}>3CS</option>
                    </select>
                </div>

                <div className="input-line">
                    <label htmlFor="semestre">Semestre</label>
                    <select
                        required
                        value={modifiedSeance.Semestre}
                        onChange={(e) => setModifiedSeance({ ...modifiedSeance, Semestre: e.target.value })}
                    >
                        <option value={"default"}> </option>
                        <option value={"S1"}>S1</option>
                        <option value={"S2"}>S2</option>
                    </select>
                </div>

                <div className="input-line">
                    <label htmlFor="module">module</label>
                    <select
                        required
                        value={modifiedSeance.Code}
                        onChange={(e) => setModifiedSeance({ ...modifiedSeance, Code: e.target.value })}
                    >
                        <option value={"default"}> </option>
                        {moduleObjects.map((module) => (
                            <option value={module.Code}>{module.NomModule}</option>
                        ))}
                    </select>
                </div>

                <div className="input-line">
                    <label htmlFor="jour">section</label>
                    <select
                        required
                        value={modifiedSeance.idSection}
                        onChange={(e) => { setModifiedSeance({ ...modifiedSeance, idSection: e.target.value }); setSelectedSection(e.target.value);}}
                    >
                        <option value={"-1"}> </option>
                        {filteredSections.map((section) => (
                            <option value={section.idSection}>{section.NomSection}</option>
                        ))}
                    </select>
                </div>

                {appearGroupe &&

                    <div className="input-line">
                        <label htmlFor="jour">groupe</label>
                        <select
                            required
                            value={modifiedSeance.idGroupe}
                            onChange={(e) => setModifiedSeance({ ...modifiedSeance, idGroupe: e.target.value })}
                        >
                            <option value={"default"}></option>
                            {filteredGroupes.map((groupe) => (
                                <option value={groupe.idGroupe}>{groupe.Numero}</option>
                            ))}
                        </select>
                    </div>

                }

                <div className="input-line">
                    <label htmlFor="salle">salle</label>
                    <select
                        required
                        value={modifiedSeance.idSalle}
                        onChange={(e) => setModifiedSeance({ ...modifiedSeance, idSalle: e.target.value })}
                    >
                        <option value={"-1"}> </option>
                        {filteredSalles.map((salle) => (
                            <option value={salle.IdSalle}>{salle.NomSalle}</option>
                        ))}
                    </select>
                </div>
                <div className="ajouter-btns">
                    <button onClick={() => props.anullerModifierSeance()}>Annuler</button>
                    <button className='sauvegarder-ajouter-btn'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </div>
    )
}