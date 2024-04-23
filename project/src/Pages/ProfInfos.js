import React, { useState, useEffect } from "react";
import '../Styles/Profinfos.css'
import { InfosPersonnelles } from "../Components/InfosPersonnelles";
import axios, { Axios } from "axios";
import { Enseignant } from "../Constructors";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export function ProfInfos() {

    const matricule = 1;

    const [enseignant, setEnseignant] = useState(new Enseignant(matricule));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uri = `http://localhost:3000/profs/${encodeURIComponent(matricule)}`; // Construct the URI with proper URL encoding
                console.log("URI:", uri); // Log the URI
                const response = await axios.get(uri); // Make the HTTP request
                setEnseignant(response.data);
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
            component: <InfosPersonnelles enseignant={enseignant} />,
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
                <h2>{`${enseignant.nom} ${enseignant.prenom}`}</h2>
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

    const [Absences, setAbsences] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/absences')
            .then(res => {
                setAbsences(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const [newAbsence, setNewAbsence] = useState({
        id: '',
        matricule: props.matricule,
        date_absence: '',
        heureDebut: '',
        heureFin: '',
        motif: ''
    });

    //pour etre sure que le id != 0 par ce que useEffect prend un temps pour fetcher 

    useEffect(() => {
        setNewAbsence(prevState => ({
            ...prevState,
            id: Absences.length.toString()
        }));
    }, [Absences]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/absences', newAbsence)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
    }

    const handleReload = () => {
        window.location.reload(); // Reload the page
    };

    return (
        <div className="container-update-absence container-ajouter-absence">
            <h2>Ajouter Absence</h2>
            <div className="line-decoration" />
            <form onSubmit={handleSubmit}>
                <div className="input-line">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        onChange={(e) => setNewAbsence({ ...newAbsence, date_absence: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureDebut">heure debut</label>
                    <input
                        type="time"
                        onChange={(e) => setNewAbsence({ ...newAbsence, heureDebut: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="heureFin">heure fin</label>
                    <input
                        type="time"
                        onChange={(e) => setNewAbsence({ ...newAbsence, heureFin: e.target.value })}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="motif">motif</label>
                    <select
                        size={selectSize}
                        onBlur={() => setSelectSize(1)}
                        className="options"
                        onChange={(e) => setNewAbsence({ ...newAbsence, motif: e.target.value })}
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
                        type="submit" onClick={() => handleReload()} > Sauvegarder</button>
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
            component: null,
        },
        {
            title: "comptabilité",
            component: null,
        },

    ]



    return (
        <div className="container-modifier-profile">
            <h2>modifier profile</h2>
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
            .min(1000000000, "Le numero telephone est de 10 chiffres")
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
                        value={props.enseignant.nom}
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
                        value={props.enseignant.prenom}
                        {...register("prenom")}
                    />
                </div>
                {errors.prenom && <p>{errors.prenom?.message}</p>}
            </div>

            <div className="input-line">
                <label htmlFor="dateNaissance">date Naissance</label>
                <input
                    type="date"
                    value={props.enseignant.dateNaissance}
                />
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="adresse">adresse</label>
                    <input
                        type="text"
                        {...register('adress')}
                    />
                </div>
                {errors.adress && <p>{errors.adress?.message}</p>}
            </div>

            <div className="input-container">
                <div className="input-line">
                    <label htmlFor="numTel">Numéro telephone</label>
                    <input
                        type="text"
                        value={props.enseignant.numTelephone}
                        {...register('numTelephone')}
                    />
                </div>
                {errors.numTelephone && <p>{errors.numTelephone?.message}</p>}
            </div>

            <div className="input-line">
                <label htmlFor="grade">grade</label>
                <input
                    type="text"
                    value={props.enseignant.grade}
                />
            </div>

            <div className="input-line">
                <label htmlFor="fonctions">fonction</label>
                <select
                    value={props.enseignant.fonction.toLowerCase()}
                >
                    <option value={"chercheur"}>chercheur</option>
                    <option value={"professeur"}>professeur</option>
                    <option value={"doctorat"}>doctorat</option>
                </select>
            </div>

            <div className="update-profile-btns">
                <button onClick={() => { props.annulerModification() }} >Annuler</button>
                <button className='sauvegarder-absence'
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

