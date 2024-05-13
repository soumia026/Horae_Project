import React, { useState, useEffect } from "react";
import '../Styles/Profinfos.css'
import { InfosPersonnelles } from "../Components/InfosPersonnelles";
import axios from "axios";
import { teacher } from "../Constructors";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ChargeHoraire } from "../Components/ChargeHoraire";

export function ProfInfos() {

    const { matricule } = useParams();

    const [enseignant, setEnseignant] = useState(new teacher(matricule));

    const [absences, setAbsences] = useState([]);

    const [modules, setModules] = useState([]);

    const [seances, setSeances] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uri = `http://127.0.0.1:8000/Administration/teachinfos/${matricule}/?format=json`; // Construct the URI with proper URL encoding
                console.log("URI:", uri); // Log the URI
                const response = await axios.get(uri); // Make the HTTP request
                setEnseignant(response.data.teacher);
                setAbsences(response.data.absences);
                setModules(response.data.modules);
                setSeances(response.data.seances)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const comparerParJour = (a, b) => {
        if (a.Jour < b.Jour) {
            return -1;
        }
        if (a.Jour > b.Jour) {
            return 1;
        }
        return 0;
    };

    // Tri des séances en fonction de l'attribut "Jour"
    const trierSeances = () => {
        const seancesTrie = [...seances];
        seancesTrie.sort(comparerParJour);
        setSeances(seancesTrie);
    };

    useEffect(() => {
        trierSeances();
    }, []); 


    const btns = [
        {
            title: "infos personnelles",
            component: <InfosPersonnelles enseignant={enseignant} absences={absences} modules={modules} />,
        },
        {
            title: "charge horaire",
            component: <ChargeHoraire seances= {seances} />,
        },
        {
            title: "comptabilité",
            component: null,
        },
    ]


    const [clickedButton, setClickedButon] = useState(0);

    const toggle = (index) => {
        setClickedButon(index === clickedButton ? null : index)
    }

    //Ajouter Absence Button
    const [ajouterAbsenceClicked, setAjouterAbscenceClicked] = useState(false);

    //Modifier Profile Button
    const [modifierProfileClicked, setModifierProfileClicked] = useState(false);

    const annulerModification = () => {
        setModifierProfileClicked(false);
    }

    //Suuprimer Enseignant Button
    const [supprimerProfClicked, setSupprimerProfClicked] = useState(false);

    const annulerSuppression = () => {
        setSupprimerProfClicked(false);
    }
    return (
        <div className="main-container dynamic-container prof-infos-container">
            <div className="profile-flex-container">
                <h2>{`${enseignant.Nom} ${enseignant.Prénom}`}</h2>
                <div className="update-btns">
                    <button className="update" onClick={() => setModifierProfileClicked(true)}>modifier profile</button>
                    <button className="update" onClick={() => setAjouterAbscenceClicked(true)}>ajouter abscence</button>
                    <button className="delete" onClick={() => setSupprimerProfClicked(true)}>supprimer</button>
                </div>
            </div>
            <div className="buttons-container">
                <div className="infos-butns">
                    {btns.map((btn, index) => (
                        <button onClick={() => toggle(index)} className={index === clickedButton ? 'clicked' : null}>{btn.title}</button>
                    ))}
                </div>
            </div>
            {btns[clickedButton].component}
            {ajouterAbsenceClicked &&
                <AjouterAbsence matricule={matricule}
                    handleAnnuler={() => setAjouterAbscenceClicked(false)} />}

            {modifierProfileClicked &&
                <ModifierProfile enseignant={enseignant} annulerModification={annulerModification} modules={modules} matricule={matricule} />
            }

            {supprimerProfClicked &&
                <SupprimerProfile Matricule={matricule} annulerSuppression={annulerSuppression} />
            }

        </div >
    )
}

//----------------Button Ajouter  Absence -------------------//

const AjouterAbsence = (props) => {

    const [selectSize, setSelectSize] = useState(1);//for the select tag

    const [newAbsence, setNewAbsence] = useState({
        DateAbs: "",
        HeureDebut: "",
        HeureFin: "",
        Motif: "",
        IdProf: props.matricule,
    });

    //pour etre sure que le id != 0 par ce que useEffect prend un temps pour fetcher 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/Administration/insertAbs/${newAbsence.IdProf}/`, newAbsence)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err.response.data));
    }

    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
        setInputType('date');
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

    const [inputType2, setInputType2] = useState('text');

    const handleFocus2 = () => {
        setInputType2('time');
    };

    const handleBlur2 = () => {
        setInputType2('text');
    };
    return (
        <div className="container-update-absence container-ajouter-absence">
            <h2>Ajouter Absence</h2>
            <div className="line-decoration" />
            <form onSubmit={handleSubmit}>
                <div className="input-line">
                    <label htmlFor="date">Date</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type={inputType} placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setNewAbsence({ ...newAbsence, DateAbs: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureDebut">heure debut</label>
                    <input
                        type={inputType1} placeholder=""
                        onFocus={handleFocus1}
                        onBlur={handleBlur1}
                        onChange={(e) => setNewAbsence({ ...newAbsence, HeureDebut: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureFin">heure fin</label>
                    <input
                        type={inputType2} placeholder=""
                        onFocus={handleFocus2}
                        onBlur={handleBlur2}
                        onChange={(e) => setNewAbsence({ ...newAbsence, HeureFin: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="motif">motif</label>
                    <select
                        size={selectSize}
                        onBlur={() => setSelectSize(1)}
                        className="options"
                        onChange={(e) => setNewAbsence({ ...newAbsence, Motif: e.target.value })}
                    >
                        <option value=""></option>
                        <option value="malade">maladie</option>
                        <option value="voyage">voyage</option>
                        <option value="etude">etude</option>
                    </select>
                </div>
                <div className="update-absence-btns">
                    <button onClick={() => props.handleAnnuler()}>Annuler</button>
                    <button className='sauvegarder-absence'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </div>
    )
}

//--------------------Modifier Profile-------------//

const ModifierProfile = (props) => {

    const [clickedButton, setClickedButon] = useState(0);

    const toggle = (index) => {
        setClickedButon(index === clickedButton ? null : index)
    }

    const modifierBtns = [
        {
            title: "infos personnelles",
            component: <ModifierInfosProf enseignant={props.enseignant} annulerModification={props.annulerModification} />,
        },
        {
            title: "ajouter sceance",
            component: <AjouterSeance matricule={props.matricule} annulerModification={props.annulerModification} modules={props.modules} />,
        },
        {
            title: "comptabilité",
            component: null,
        },

    ]

    return (
        <div className="container-modifier-profile">
            <h2 className="title">modifier profile</h2>
            <div className="buttons-container">
                <div className="infos-butns">
                    {modifierBtns.map((btn, index) => (
                        <button onClick={() => toggle(index)} className={index === clickedButton ? 'clicked' : null}>{btn.title}</button>
                    ))}
                </div>
                {modifierBtns[clickedButton].component}
            </div>
        </div>
    )
}

const ModifierInfosProf = (props) => {

    const schema = yup.object().shape({
        Nom: yup.string().matches(/^[a-zA-Z\s]*$/, "Nom ne doit contenir que des caractères").required("Le champ nom est obligatoire"),
        Prénom: yup.string().matches(/^[a-zA-Z\s]*$/, "Prénom ne doit contenir que des caractères").required("Le champ prénom est obligatoire"),
        DateNaissance: yup.string(),
        Email: yup.string().email().matches(/@esi-sba\.dz$/, "L'adresse email doit se terminer par @esi-sba.dz").required("L'email est obligatoire"),
        Adresse: yup.string().required("Le champ adresse est obligatoire"),
        NumeroTelephone: yup.string().required("Numéro de téléphone est obligatoire"),
        Grade: yup.string(),
        Etablissement: yup.string().required("Le champ établissement est obligatoire"),
        Fonction: yup.string(),
    });


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [modifiedEnseignant, setModifiedEnseignant] = useState({
        Matricule: props.enseignant.Matricule,
        Nom: props.enseignant.Nom,
        Prénom: props.enseignant.Prénom,
        DateNaissance: props.enseignant.DateNaissance,
        Adresse: props.enseignant.Adresse,
        Email: props.enseignant.Email,
        NumeroTelephone: props.enseignant.NumeroTelephone,
        Fonction: props.enseignant.Fonction,
        Grade: props.enseignant.Grade,
        Etablissement: props.enseignant.Etablissement,
        MotDePasse: props.enseignant.MotDePasse
    });

    const [clickCount, setClickCount] = useState(0);

    const onSubmit = (data, e) => {

        e.preventDefault();

        console.log(data);
        setModifiedEnseignant({
            Matricule: props.enseignant.Matricule,
            Nom: data.Nom,
            Prénom: data.Prénom,
            DateNaissance: data.DateNaissance,
            Adresse: data.Adresse,
            Email: data.Email,
            NumeroTelephone: data.NumeroTelephone,
            Fonction: data.Fonction,
            Grade: props.enseignant.Grade,
            Etablissement: data.Etablissement,
            MotDePasse: props.enseignant.MotDePasse
        });

        axios.put(`http://127.0.0.1:8000/Administration/updateEnseignant/${modifiedEnseignant.Matricule}/`, modifiedEnseignant)
            .then(res => {
                console.log(res.data);
                setClickCount(prevCount => prevCount + 1); // Increment click count
                if (clickCount === 1) {
                    window.location.reload(); // Reload the page after the second click
                }
            })
            .catch(err => console.log(err.response.data));
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="nom">nom</label>
                    <input
                        type="text"
                        defaultValue={modifiedEnseignant.Nom}
                        {...register("Nom")}
                    />
                </div>
                {errors.Nom && <p>{errors.Nom?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="prenom">prénom</label>
                    <input
                        type="text"
                        defaultValue={modifiedEnseignant.Prénom}
                        {...register("Prénom")}
                    />
                </div>
                {errors.Prénom && <p>{errors.Prénom?.message}</p>}
            </div>

            <div className="input-line">
                <label htmlFor="dateNaissance">date Naissance</label>
                <input
                    type="date"
                    style={{ textTransform: 'lowercase' }}
                    defaultValue={modifiedEnseignant.DateNaissance}
                    {...register("DateNaissance")}
                />
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="adresse">adresse</label>
                    <input
                        type="text"
                        defaultValue={modifiedEnseignant.Adresse}
                        {...register("Adresse")}
                    />
                </div>
                {errors.Adresse && <p>{errors.Adresse?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="adresse">email</label>
                    <input
                        type="text"
                        style={{ textTransform: 'lowercase' }}
                        defaultValue={modifiedEnseignant.Email}
                        {...register('Email')}
                    />
                </div>
                {errors.Email && <p>{errors.Email?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="numTel">Numéro telephone</label>
                    <input
                        type="text"
                        defaultValue={modifiedEnseignant.NumeroTelephone}
                        {...register('NumeroTelephone')}
                    />
                </div>
                {errors.NumeroTelephone && <p>{errors.NumeroTelephone?.message}</p>}
            </div>

            <div className="input-line">
                <label htmlFor="grade">grade</label>
                <select
                    defaultValue={modifiedEnseignant.Grade}
                    {...register('Grade')}
                >
                    <option value={"professeur"}>professeur</option>
                    <option value={"Professor"}>professor</option>
                    <option value={"MCA"}>MCA</option>
                    <option value={"MCB"}>MCB</option>
                    <option value={"maa"}>MAA</option>
                    <option value={"mab"}>MAB</option>
                </select>
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="etablissement">etablissement</label>
                    <input
                        type="text"
                        defaultValue={modifiedEnseignant.Etablissement}
                        {...register("Etablissement")}
                    />
                </div>
                {errors.Etablissement && <p>{errors.Etablissement?.message}</p>}
            </div>

            <div className="input-line">
                <label htmlFor="fonctions">fonction</label>
                <select
                    defaultValue={modifiedEnseignant.Fonction}
                    {...register('Fonction')}
                >
                    <option value={"Fonction1"}>Fonction1</option>
                    <option value={"Fonction2"}>Fonction2</option>
                </select>
            </div>

            <div className="update-profile-btns">
                <button onClick={() => { props.annulerModification() }} >Annuler</button>
                <button className='sauvegarder-btn'
                    type="submit" > Sauvegarder</button>
            </div>
        </form>
    )
}

const AjouterSeance = (props) => {

    //to get the rest height and give it to the form
    const formRef = useRef(null);

    useEffect(() => {
        function adjustFormHeight() {
            const container = document.querySelector('.container-modifier-profile');
            const titleElement = container.querySelector('.title');
            const buttonsElement = container.querySelector('.buttons-container');

            const titleAndButtonsHeight = titleElement.getBoundingClientRect().height +
                buttonsElement.getBoundingClientRect().height;
            const containerHeight = container.getBoundingClientRect().height;
            const remainingHeight = containerHeight - titleAndButtonsHeight;
            formRef.current.style.height = `${remainingHeight}px`;
        }

        window.addEventListener('resize', adjustFormHeight);
        adjustFormHeight(); // Adjust height initially

        return () => {
            window.removeEventListener('resize', adjustFormHeight);
        };
    }, []);

    const schema = yup.object().shape({
        NomS: yup.string().required("veuillez saisie le jour de la scéance"),
        Type: yup.string(),
        Jour: yup.string(),
        HeureDebut: yup.string().required("veuillez saisie l'heure début de scéance"),
        HeureFin: yup.string().required("veuillez saisie l'heure fin de scéance"),
        Semestre: yup.string(),
        Promotion: yup.string(),
        Module: yup.string(),
        Section: yup.string(),
        Groupe: yup.string().optional(),
        Salle: yup.string(),

    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    //Récupération des data: salles, groupes...

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

    const [selctedCycle, setSelectedCycle] = useState("");

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "1CPI" || selectedValue === "2CPI") {
            setSelectedCycle('Classe préparatoire');
        } else {
            setSelectedCycle('Seconde Cycle');
        }
    };

    const filteredSalles = salles.filter((salle) => salle.Zone === selctedCycle);

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

    const [selectedPromo, setSeelctedPromo] = useState("default")

    const filteredSections = sections.filter((section) => section.nomP === selectedPromo)


    //----------groupes----------

    const [groupes, setGroupes] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/Administration/groupes')
            .then((res) => {
                setGroupes(res.data)
            })
            .catch((err) => { console.log(err) })

    }, []);

    const [selectedSection, setSelectedSection] = useState(-1);

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

    
    const [newSeance, setNewSeance] = useState({
        NomS: '',
        Type: '',
        Jour: '',
        HeureDebut: '',
        HeureFin: '',
        Semestre: '',
        Matricule: props.matricule,
        Code: '',
        idSalle: 0,
        idPromo: '',
        idGroupe: 0,
        idSection: 0
    })
    const onSubmit = (data) => {
        console.log(data);

        setNewSeance({
            NomS: data.NomS,
            Type: data.Type,
            Jour: data.Jour,
            HeureDebut: data.HeureDebut,
            HeureFin: data.HeureFin,
            Semestre: data.Semestre,
            Matricule: props.matricule,
            Code: data.Module,
            idSalle: data.Salle,
            idPromo: data.Promotion,
            idGroupe: data.Groupe,
            idSection: data.Section
        });

        axios.post(`http://127.0.0.1:8000/Administration/insertSeance/${newSeance.Matricule}/${newSeance.Semestre}/`, newSeance)
        .then((res) => {
            window.location.reload()
        })
        .catch((err) => {console.log(err.response.data)})
    }

    return (
        <form className="form-ajouter-sceance" ref={formRef} onSubmit={handleSubmit(onSubmit)}>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="NomS">nom séance</label>
                    <input
                        type="text"
                        {...register('NomS')}
                    />
                </div>
                {errors.NomS && <p>{errors.NomS?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="type">type scéance</label>
                    <select {...register('Type')} onChange={handleChange}>
                        <option value={"Cours"}>cours</option>
                        <option value={"Td"}>TD</option>
                        <option value={"Tp"}>TP</option>
                    </select>
                </div>
                {errors.Type && <p>{errors.Type?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="jour">jour</label>
                    <select {...register('Jour')}>
                        <option value={"default"}> </option>
                        <option value={"Dimanche"}>dimanche</option>
                        <option value={"Lundi"}>lundi</option>
                        <option value={"Mardi"}>mardi</option>
                        <option value={"Mercredi"}>mercredi</option>
                        <option value={"Jeudi"}>jeudi</option>
                    </select>
                </div>
                {errors.Jour && <p>{errors.Jour?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="heureDebut">heure debut</label>
                    <input
                        type={inputType} placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...register("HeureDebut")}
                    />
                </div>
                {errors.HeureDebut && <p>{errors.HeureDebut?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="HeureFin">heure fin</label>
                    <input
                        type={inputType1} placeholder=""
                        onFocus={handleFocus1}
                        onBlur={handleBlur1}
                        {...register("HeureFin")}
                    />
                </div>
                {errors.HeureFin && <p>{errors.HeureFin?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="promotion">promotion</label>
                    <select  {...register('Promotion')} onChange={(e) => { handleSelectChange(e); setSeelctedPromo(e.target.value) }}>
                        <option value={"default"}> </option>
                        <option value={"1CPI"}>1CPI</option>
                        <option value={"2CPI"}>2CPI</option>
                        <option value={"1CS"}>1CS</option>
                        <option value={"2CS"}>2CS</option>
                        <option value={"3CS"}>3CS</option>
                    </select>
                </div>

            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="semestre">Semestre</label>
                    <select  {...register('Semestre')} >
                        <option value={"default"}> </option>
                        <option value={"S1"}>S1</option>
                        <option value={"S2"}>S2</option>
                    </select>
                </div>

            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="module">module</label>
                    <select {...register('Module')}>
                        <option value={"default"}> </option>
                        {props.modules.map((module) => (
                            <option value={module.Code}>{module.NomModule}</option>
                        ))}
                    </select>
                </div>
                {errors.Module && <p>{errors.Module?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="jour">section</label>
                    <select {...register('Section')} onChange={(e) => { setSelectedSection(e.target.value) }}>
                        <option value={"-1"}> </option>
                        {filteredSections.map((section) => (
                            <option value={section.idSection}>{section.NomSection}</option>
                        ))}
                    </select>
                </div>
                {errors.Section && <p>{errors.Section?.message}</p>}
            </div>

            {appearGroupe &&

                <div className="input-container">
                    <div className="input-line">
                        <label htmlFor="jour">groupe</label>
                        <select {...register('Groupe')}>
                            {filteredGroupes.map((groupe) => (
                                <option value={groupe.idGroupe}>{groupe.Numero}</option>
                            ))}
                        </select>
                    </div>
                    {errors.Groupe && <p>{errors.Groupe?.message}</p>}
                </div>
            }


            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="salle">salle</label>
                    <select {...register('Salle')}>
                        <option value={"-1"}> </option>
                        {filteredSalles.map((salle) => (
                            <option value={salle.IdSalle}>{salle.NomSalle}</option>
                        ))}
                    </select>
                </div>
                {errors.Salle && <p>{errors.Salle?.message}</p>}
            </div>

            <div className="update-profile-btns">
                <button onClick={() => { props.annulerModification() }} >Annuler</button>
                <button className='sauvegarder-btn'
                    type="submit" > Sauvegarder</button>
            </div>
        </form>
    )
}

//----------------------Supprimer Profile----------------------//

const SupprimerProfile = (props) => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        axios.delete(`http://127.0.0.1:8000/Administration/delete_enseignants/${props.Matricule}/`)
            .then(() => {
                navigate('/admin/enseignants')
            })
            .catch(err => console.log(err.response.data))

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container-supprimer-profile">
                <div className="warning-circle">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4993 32.0832C25.5535 32.0832 32.0827 25.554 32.0827 17.4998C32.0827 9.44568 25.5535 2.9165 17.4993 2.9165C9.4452 2.9165 2.91602 9.44568 2.91602 17.4998C2.91602 25.554 9.4452 32.0832 17.4993 32.0832Z" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 11.6667V17.5" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 23.3333H17.5138" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <p>Est ce que vous etes sur de la suppression de ce compte?</p>
                <div className="supprimer-profile-btns">
                    <button className="annuler" onClick={() => props.annulerSuppression()}>Annuler</button>
                    <button type="submit" className="supprimer">Supprimer</button>
                </div>
            </div>
        </form>

    )
}

