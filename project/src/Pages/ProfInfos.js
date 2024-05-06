import React, { useState, useEffect } from "react";
import '../Styles/Profinfos.css'
import { InfosPersonnelles } from "../Components/InfosPersonnelles";
import axios from "axios";
import { teacher } from "../Constructors";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from "react";

export function ProfInfos() {

    const matricule = "bb";

    const [enseignant, setEnseignant] = useState(new teacher(matricule));

    const [absences, setAbsences] = useState([]);

    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uri = `http://127.0.0.1:8000/Administration/teachinfos/${matricule}/?format=json`; // Construct the URI with proper URL encoding
                console.log("URI:", uri); // Log the URI
                const response = await axios.get(uri); // Make the HTTP request
                setEnseignant(response.data.teacher);
                setAbsences(response.data.absences);
                setModules(response.data.modules);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


    const btns = [
        {
            title: "infos personnelles",
            component: <InfosPersonnelles enseignant={enseignant} absences={absences} modules={modules} />,
        },
        {
            title: "charge horaire",
            component: null,
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
                <ModifierProfile enseignant={enseignant} annulerModification={annulerModification} />
            }

            {supprimerProfClicked &&
                <SupprimerProfile annulerSuppression={annulerSuppression} />
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
            .catch(err => console.log(err));
    }

    const handleReload = () => {
        window.location.reload(); // Reload the page
    };

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
                        style={{ textTransform: 'lowercase'} }
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
            component: <AjouterSeance enseignant={props.enseignant} annulerModification={props.annulerModification} />,
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
        nom: yup.string().matches(/^[a-zA-Z\s]*$/, "Nom conteint seulement des caracteres").required("le champ nom est obligatoire"),
        prenom: yup.string().matches(/^[a-zA-Z\s]*$/, "Prenom conteint seulement des caracteres").required("le champ prenom est obligatoire"),
        adress: yup.string().required("le champ adress est obligatoire"),
        numTelephone: yup.number()
            .positive("Phone number must be positive")
            .integer("Phone number must be an integer")
            .min(100000000, "Le numero telephone est de 10 chiffres")
            .max(9999999999, "Le numero telephone est de 10 chiffres")
            .required("Le numero telephone est obligatoire"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="nom">nom</label>
                    <input
                        type="text"
                        value={props.enseignant.Nom}
                        {...register("nom")}
                    />
                </div>
                {errors.nom && <p>{errors.nom?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="prenom">prénom</label>
                    <input
                        type="text"
                        value={props.enseignant.Prénom}
                        {...register("prenom")}
                    />
                </div>
                {errors.prenom && <p>{errors.prenom?.message}</p>}
            </div>

            <div className="input-line">
                <label htmlFor="dateNaissance">date Naissance</label>
                <input
                    type="date"
                    style={{ textTransform: 'lowercase'} }
                    value={props.enseignant.DateNaissance}
                />
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="adresse">adresse</label>
                    <input
                        type="text"
                        {...register('adress')}
                        value={props.enseignant.Adresse}
                    />
                </div>
                {errors.adress && <p>{errors.adress?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="numTel">Numéro telephone</label>
                    <input
                        type="text"
                        value={props.enseignant.NumeroTelephone}
                        onChange={(e) => e.target.value}
                        {...register('numTelephone')}
                    />
                </div>
                {errors.numTelephone && <p>{errors.numTelephone?.message}</p>}
            </div>

            <div className="input-line">
                <label htmlFor="grade">grade</label>
                <input
                    type="text"
                    value={props.enseignant.Grade}
                />
            </div>

            <div className="input-line">
                <label htmlFor="fonctions">fonction</label>
                <select
                    value={props.enseignant.Fonction.toLowerCase()}
                >
                    <option value={"chercheur"}>chercheur</option>
                    <option value={"professeur"}>professeur</option>
                    <option value={"doctorat"}>doctorat</option>
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
        jour: yup.string().matches("", "veuillez saisie le jour de la scéance").required("veuillez saisie le jour de la scéance"),
        heureDebut: yup.string().required("veuillez saisie l'heure début de scéance"),
        heureFin: yup.string().required("veuillez saisie l'heure fin de scéance"),
        cycle: yup.string().required("veuillez saisie le cycle "),
        promotion: yup.string().required("veuillez saisie la promotion"),
        semestre: yup.string().required("veuillez saisie le semestre"),
        specialite: yup.string().required("veuillez saisie la specialité"),
        module: yup.string().required("veuillez saisie le module"),
        type: yup.string().required("veuillez saisie le type de scéance"),
        salle: yup.string().required("veuillez spécifier la salle"),

    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        console.log(data);
    }

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

    return (
        <form className="form-ajouter-sceance" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="jour">jour</label>
                    <select {...register('jour')}>
                        <option value={"dimanche"}>dimanche</option>
                        <option value={"lundi"}>lundi</option>
                        <option value={"mardi"}>mardi</option>
                        <option value={"mercredi"}>mercredi</option>
                        <option value={"jeudi"}>jeudi</option>
                    </select>
                </div>
                {errors.jour && <p>{errors.jour?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="heureDebut">heure debut</label>
                    <input
                        type={inputType} placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...register("heureDebut")}
                    />
                </div>
                {errors.heureDebut && <p>{errors.heureDebut?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="heureFin">heure fin</label>
                    <input
                        type={inputType1} placeholder=""
                        onFocus={handleFocus1}
                        onBlur={handleBlur1}
                        {...register("heureFin")}
                    />
                </div>
                {errors.heureDebut && <p>{errors.heureDebut?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="cycle">cycle</label>
                    <select {...register('cycle')}>
                        <option value={"1cpi"}>1CPI</option>
                        <option value={"2cpi"}>2CPI</option>
                        <option value={"1cs"}>1CS</option>
                        <option value={"2cs"}>2CS</option>
                        <option value={"3cs"}>3CS</option>
                    </select>
                </div>
                {errors.cycle && <p>{errors.cycle?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="promotion">promotion</label>
                    <input
                        type="text"
                        {...register("heureFin")}
                    />
                </div>
                {errors.promotion && <p>{errors.promotion?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="specialite">specialité</label>
                    <select {...register('specialite')}>
                        <option value={"default"}></option>
                        <option value={"siw"}>SIW</option>
                        <option value={"isi"}>ISI</option>
                        <option value={"ai"}>AI</option>
                    </select>
                </div>
                {errors.specialite && <p>{errors.specialite?.message}</p>}
            </div>
            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="module">module</label>
                    <input
                        type="text"
                        {...register("module")}
                    />
                </div>
                {errors.module && <p>{errors.module?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="type">type scéance</label>
                    <select {...register('type')}>
                        <option value={"cours"}>cours</option>
                        <option value={"td"}>TD</option>
                        <option value={"tp"}>TP</option>
                    </select>
                </div>
                {errors.type && <p>{errors.type?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="salle">salle</label>
                    <input
                        type="text"
                        {...register("salle")}
                    />
                </div>
                {errors.heureDebut && <p>{errors.heureDebut?.message}</p>}
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
    return (
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
                <button className="supprimer">Supprimer</button>
            </div>
        </div>
    )
}

