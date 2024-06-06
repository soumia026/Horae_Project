import React, { useContext, useEffect, useState } from "react";
import '../Styles/Calcul.css'
import { useRef } from "react";
import { AppContext } from "../App";
import axios from "axios";

export function Calendrier() {

    const { evenements, modeSemestriel } = useContext(AppContext);


    //Ajouter un evenement

    const [ajouterEvenementClicked, setAjouterEvenementClicked] = useState(false);

    const annulerAjouteEvenement = () => {
        setAjouterEvenementClicked(false);
    }

    //modifier le mode de calcul

    const [modifierModeClicked, setModifierModeClicked] = useState(false);

    const annulerModifierMode = () => {
        setModifierModeClicked(false);
    }

    const [updateEvenement, setUpdateEvenement] = useState(null);

    const annulerModifierEvenement = () => {
        setUpdateEvenement(null)
    }

    const [supprimerEvenement, setSupprimerEvenement] = useState(null);

    const anullerSuprimerEvenement = () => {
        setSupprimerEvenement(null);
    }

    //Switch Mode

    const { modeType, setModeType } = useContext(AppContext);

    const handleSwitchMode = (text) => {
        setModeType(text);
    }

    const [lancerCalcul, setLancerCalcul] = useState(false);

    const currentDate = new Date();

    const [calculSuccess, setCalculSuccess] = useState(false);

    const handleCalcul = () => {
        if (currentDate >= new Date(modeSemestriel.dateFin)) {
            axios.get(`http://127.0.0.1:8000/Administration/calculer_montant/${modeSemestriel.dateDebut}/${modeSemestriel.dateFin}/${modeSemestriel.PUMAB}/${modeSemestriel.PUMAA}/${modeSemestriel.PUMCB}/${modeSemestriel.PUMCA}/${modeSemestriel.PUProf}/${modeSemestriel.PSec}/${modeSemestriel.PIRG}/`)
                .then((res) => {
                    setCalculSuccess(true)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            setCalculSuccess(false)
        }
    }

    const [erreurSaisie, setErreurSaisie] = useState(modeSemestriel.dateDebut === '');

    const handleErreurSaisie = () => {
        setErreurSaisie(false);
    }

    return (
        <div className="main-container calendrier-container">
            <h2 style={{ textTransform: 'none' }}>Calcul des heures supplémentaires</h2>
            <div className="grid-container">
                <div className="type-payment">
                    <div className="title-line">
                        <h2>Calcul En Mode Semestriel</h2>
                        <div className="icons">
                            <div className="circle circle-calcul" style={{ cursor: 'pointer' }} onClick={() => { setLancerCalcul(true); handleCalcul() }}>
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 8.66671H15.1667M17.3333 6.50004V10.8334M19.5 18.9584H15.1667M19.5 15.7084H15.1667M10.8333 18.9584L8.9375 17.0625M8.9375 17.0625L7.04167 15.1667M8.9375 17.0625L10.8333 15.1667M8.9375 17.0625L7.04167 18.9584M10.8333 8.66671H6.5M23.2917 14.0292V11.9709C23.2917 7.60504 23.2917 5.42104 21.7848 4.06471C20.2778 2.70837 17.8523 2.70837 13 2.70837C8.14884 2.70837 5.72217 2.70837 4.21525 4.06471C2.70834 5.42104 2.70834 7.60504 2.70834 11.9709V14.0292C2.70834 18.395 2.70834 20.579 4.21525 21.9354C5.72217 23.2917 8.14775 23.2917 13 23.2917C17.8512 23.2917 20.2778 23.2917 21.7848 21.9354C23.2917 20.579 23.2917 18.395 23.2917 14.0292Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className="circle circle-modifier" style={{ cursor: 'pointer' }} onClick={() => { setModifierModeClicked(true) }} >
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_922_859)">
                                        <path d="M23.7399 8.2605C24.8667 7.13313 25.2958 5.48538 24.3341 4.21381C23.9689 3.73411 23.5708 3.28025 23.1428 2.85564C22.718 2.42756 22.2642 2.02933 21.7846 1.66376C20.513 0.702677 18.8653 1.13173 17.7379 2.25851L8.7626 11.2344C8.44632 11.5507 8.22944 11.9519 8.18702 12.3973C8.11374 13.152 8.0469 14.5631 8.19981 16.7526C8.23924 17.3132 8.68525 17.7592 9.24577 17.7987C11.4354 17.9516 12.8465 17.8847 13.6017 17.812C14.0465 17.769 14.4477 17.5521 14.764 17.2364L23.7399 8.2605Z" stroke="black" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M22.3802 9.62035C22.0477 8.88487 21.3291 7.63774 19.8453 6.15335C18.3615 4.67016 17.1144 3.95099 16.3789 3.61841" stroke="black" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M24.3718 12.6274C24.3823 12.8303 24.3875 13.0344 24.3875 13.2396C24.3875 19.6619 19.1815 24.8679 12.7592 24.8679C6.33687 24.8679 1.13086 19.6619 1.13086 13.2396C1.13086 6.81729 6.33687 1.61133 12.7592 1.61133C12.9644 1.61133 13.1685 1.61712 13.3714 1.62698" stroke="black" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_922_859">
                                            <rect width="26" height="26" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>


                    </div>
                    <Mode typeMode={modeType} />
                </div>
                <div className="container-evenements">
                    <button className="ajouter-evenement" onClick={() => { setAjouterEvenementClicked(true) }}>Ajouter un evenement</button>
                    <h3 className="big-title">evenements spéciales</h3>
                    <div className="dynamic-list">
                        {evenements.map((evenement) => (
                            <EvenementLigne
                                nom={evenement.nomEvenement}
                                dateDebut={evenement.dateDebut}
                                dateFin={evenement.dateFin}
                                handleEvenement={() => setUpdateEvenement(evenement)}
                                supprimerEvenement={() => setSupprimerEvenement(evenement.idEvenement)}
                            />
                        ))}
                    </div>
                </div>

                {ajouterEvenementClicked && <AjouterEvenement annulerAjouteEvenement={annulerAjouteEvenement} />}

                {modifierModeClicked && <ModifierMode annulerModifierMode={annulerModifierMode} handleSwitchMode={handleSwitchMode} />}

                {updateEvenement && <ModifierEvenement evenement={updateEvenement} annulerModifierEvenement={annulerModifierEvenement} />}

                {supprimerEvenement && <SupprimerEvenement supprimerEvenement={supprimerEvenement} anullerSuprimerEvenement={anullerSuprimerEvenement} />}

                {erreurSaisie &&
                    <Warning2 compris = {() => handleErreurSaisie()} />
                }

                {lancerCalcul && calculSuccess &&
                    <Confirmation compris={() => setLancerCalcul(false)} />
                }


            </div>
        </div>
    )
}

//Components

const EvenementLigne = (props) => {
    return (
        <div className="evenement-line">
            <div className="evenement-title">
                <p>{props.nom}</p>
                <div className="evenement-modifier-button">

                    <svg onClick={() => props.handleEvenement()} cursor={'pointer'} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.625 1.55516C11.811 1.37915 12.0319 1.23953 12.275 1.14428C12.518 1.04903 12.7786 1 13.0417 1C13.3048 1 13.5653 1.04903 13.8084 1.14428C14.0514 1.23953 14.2723 1.37915 14.4583 1.55516C14.6444 1.73116 14.7919 1.94011 14.8926 2.17008C14.9933 2.40004 15.0451 2.64651 15.0451 2.89542C15.0451 3.14433 14.9933 3.39081 14.8926 3.62077C14.7919 3.85073 14.6444 4.05968 14.4583 4.23569L4.89583 13.2825L1 14.2877L2.0625 10.602L11.625 1.55516Z" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg onClick={() => props.supprimerEvenement()} width="17" cursor={'pointer'} height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.125 4.25H3.54167H14.875" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.4577 4.25008V14.1667C13.4577 14.5425 13.3084 14.9028 13.0428 15.1685C12.7771 15.4342 12.4167 15.5834 12.041 15.5834H4.95768C4.58196 15.5834 4.22162 15.4342 3.95595 15.1685C3.69027 14.9028 3.54102 14.5425 3.54102 14.1667V4.25008M5.66602 4.25008V2.83341C5.66602 2.45769 5.81527 2.09736 6.08095 1.83168C6.34662 1.566 6.70696 1.41675 7.08268 1.41675H9.91602C10.2917 1.41675 10.6521 1.566 10.9178 1.83168C11.1834 2.09736 11.3327 2.45769 11.3327 2.83341V4.25008" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.08398 7.79175V12.0417" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.91602 7.79175V12.0417" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
            </div>

            <div className="dates-evenements">
                <div className="date">
                    <p>Date Debut: </p>
                    <span>{props.dateDebut}</span>
                </div>
                <div className="date">
                    <p>Date fin: </p>
                    <span>{props.dateFin}</span>
                </div>
            </div>
        </div>
    )
}

//Interfaces

const Mode = (props) => {

    const { modeSemestriel } = useContext(AppContext);

    return (
        <div className="container-parametres">
            <div className="parametres-heure">
                <div className="les-parametres">
                    <table>
                        <tr>
                            <td >
                                <span> {props.typeMode === 'semestre' ? 'date debut semestre:' : 'date debut annee'} </span>
                                <p>
                                    {modeSemestriel.dateDebut}
                                </p>
                            </td>
                            <td>
                                <span>{props.typeMode === 'semestre' ? 'date fin semestre:' : 'date fin annee'} </span>
                                <p>
                                    {modeSemestriel.dateFin}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <span>charge cours: </span>
                                <p>
                                    {modeSemestriel.chargeCours}
                                </p>
                            </td>
                            <td>
                                <span>charge td: </span>
                                <p>
                                    {modeSemestriel.chargeTD}
                                </p>
                            </td>
                            <td>
                                <span>charge tp: </span>
                                <p>
                                    {modeSemestriel.chargeTP}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <span>pourcentage cours: </span>
                                <p>
                                    {modeSemestriel.tauxCours} %
                                </p>
                            </td>
                            <td>
                                <span>pourcentage td: </span>
                                <p>
                                    {modeSemestriel.tauxTD} %
                                </p>
                            </td>
                            <td>
                                <span>pourcentage tp: </span>
                                <p>
                                    {modeSemestriel.tauxTP} %
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <span>Prix Unitaire professeur: </span>
                                <p>
                                    {modeSemestriel.PUProf} DZD
                                </p>
                            </td>
                            <td>
                                <span>Prix Unitaire MCA: </span>
                                <p>
                                    {modeSemestriel.PUMCA} DZD
                                </p>
                            </td>
                            <td>
                                <span>Prix Unitaire MCB: </span>
                                <p>
                                    {modeSemestriel.PUMCB} DZD
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <span>Prix Unitaire MAA: </span>
                                <p>
                                    {modeSemestriel.PUMAA} DZD
                                </p>
                            </td>
                            <td>
                                <span>Prix Unitaire MAB: </span>
                                <p>
                                    {modeSemestriel.PUMAB} DZD
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <span>Pourcentage Sec Sociale: </span>
                                <p>
                                    {modeSemestriel.PSec}%
                                </p>
                            </td>
                            <td>
                                <span>Pourcentage IRG </span>
                                <p>
                                    {modeSemestriel.PIRG}%
                                </p>
                            </td>
                        </tr>

                    </table>

                </div>
            </div>
        </div>
    )
}

const AjouterEvenement = (props) => {

    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
        setInputType('date');
    };

    const handleBlur = () => {
        setInputType('text');
    };

    const [inputType1, setInputType1] = useState('text');

    const handleFocus1 = () => {
        setInputType1('date');
    };

    const handleBlur1 = () => {
        setInputType1('text');
    };

    const { evenements } = useContext(AppContext);


    const [newEvenement, setNewEvenement] = useState({
        idEvenement: evenements.length === 0 ? 1 : evenements[evenements.length - 1].idEvenement + 1,
        nomEvenement: '',
        dateDebut: '',
        dateFin: ''
    })

    const { setEvenements } = useContext(AppContext)

    const onSubmit = (e) => {
        e.preventDefault();
        setEvenements([...evenements, newEvenement]);
        props.annulerAjouteEvenement();
    }

    return (
        <div className="container-ajouter-evenement">
            <h2>ajouter un evenement</h2>
            <div className="line-decoration" />
            <form onSubmit={onSubmit}>

                <div className="input-line">
                    <label htmlFor="nom">evenement</label>
                    <input type="text" required onChange={(e) => setNewEvenement({ ...newEvenement, nomEvenement: e.target.value })} />
                </div>

                <div className="input-line">
                    <label htmlFor="dateDebut">date debut</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type={inputType}
                        placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                        onChange={(e) => setNewEvenement({ ...newEvenement, dateDebut: e.target.value })}
                    />
                </div>

                <div className="input-line">
                    <label htmlFor="dateFin">date fin</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type={inputType1}
                        placeholder=""
                        onFocus={handleFocus1}
                        onBlur={handleBlur1}
                        required
                        onChange={(e) => setNewEvenement({ ...newEvenement, dateFin: e.target.value })}
                    />
                </div>

                <div className="ajoute-evenement-btns">
                    <button className="annuler-btn" onClick={() => props.annulerAjouteEvenement()}>annuler</button>
                    <button className="sauvegarder-btn" type="submit">sauvegarder</button>
                </div>
            </form>
        </div>
    )
}

const ModifierEvenement = (props) => {

    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
        setInputType('date');
    };

    const handleBlur = () => {
        setInputType('text');
    };

    const [inputType1, setInputType1] = useState('text');

    const handleFocus1 = () => {
        setInputType1('date');
    };

    const handleBlur1 = () => {
        setInputType1('text');
    };

    const { evenements } = useContext(AppContext);

    const { setEvenements } = useContext(AppContext);

    const [modifiedEvenement, setModifiedEvenement] = useState({
        idEvenement: props.evenement.idEvenement,
        nomEvenement: props.evenement.nomEvenement,
        dateDebut: props.evenement.dateDebut,
        dateFin: props.evenement.dateFin
    })

    const onSubmit = (e) => {
        e.preventDefault();
        const updatedEvenements = evenements.map(evenement =>
            evenement.idEvenement === modifiedEvenement.idEvenement ? modifiedEvenement : evenement
        );
        setEvenements(updatedEvenements);
        props.annulerModifierEvenement();
    }

    return (
        <div className="container-ajouter-evenement">
            <h2>ajouter un evenement</h2>
            <div className="line-decoration" />
            <form onSubmit={onSubmit}>

                <div className="input-line">
                    <label htmlFor="nom">evenement</label>
                    <input
                        type="text"
                        value={modifiedEvenement.nomEvenement}
                        onChange={(e) => setModifiedEvenement({ ...modifiedEvenement, nomEvenement: e.target.value })}
                        required
                    />
                </div>

                <div className="input-line">
                    <label htmlFor="dateDebut">date debut</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type={inputType}
                        value={modifiedEvenement.dateDebut}
                        placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                        onChange={(e) => setModifiedEvenement({ ...modifiedEvenement, dateDebut: e.target.value })}
                    />
                </div>

                <div className="input-line">
                    <label htmlFor="dateFin">date fin</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type={inputType1}
                        value={modifiedEvenement.dateFin}
                        placeholder=""
                        onFocus={handleFocus1}
                        onBlur={handleBlur1}
                        required
                        onChange={(e) => setModifiedEvenement({ ...modifiedEvenement, dateFin: e.target.value })}
                    />
                </div>

                <div className="ajoute-evenement-btns">
                    <button className="annuler-btn" onClick={() => props.annulerModifierEvenement()}>annuler</button>
                    <button className="sauvegarder-btn" type="submit">sauvegarder</button>
                </div>
            </form>
        </div>
    )
}

const SupprimerEvenement = (props) => {

    const { evenements } = useContext(AppContext);

    const { setEvenements } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvenements = evenements.filter((evenement) => evenement.idEvenement !== props.supprimerEvenement);
        setEvenements(newEvenements);
        props.anullerSuprimerEvenement();
    }

    return (
        <form className="form-supprimer-evenement" onSubmit={handleSubmit}>
            <div className="container-supprimer-evenement">
                <div className="warning-circle">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4993 32.0832C25.5535 32.0832 32.0827 25.554 32.0827 17.4998C32.0827 9.44568 25.5535 2.9165 17.4993 2.9165C9.4452 2.9165 2.91602 9.44568 2.91602 17.4998C2.91602 25.554 9.4452 32.0832 17.4993 32.0832Z" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 11.6667V17.5" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 23.3333H17.5138" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <p>Est ce que vous etes sur de la suppression de cette évenement?</p>
                <div className="supprimer-evenement-btns">
                    <button className="annuler" onClick={() => props.anullerSuprimerEvenement()} >Annuler</button>
                    <button type="submit" className="supprimer">Supprimer</button>
                </div>
            </div>
        </form>

    )
}

//----------------------Modifier Mode-------------------

const ModifierMode = (props) => {

    const [modeBtnClicked, setModeBtnClicked] = useState(0);

    const [step, setStep] = useState(1);

    const handleChange = () => {
        setStep(step + 1)
    };

    const modeBtns = [
        {
            title: 'semestriel',
            component: <ModifierModeSemestre step={step} handleChange={handleChange} annulerModifierMode={props.annulerModifierMode} handleSwitchMode={props.handleSwitchMode} />
        },
        {
            title: 'annuel',
            component: <ModifierModeAnnuel step={step} handleChange={handleChange} annulerModifierMode={props.annulerModifierMode} handleSwitchMode={props.handleSwitchMode} />
        }
    ]

    const toggle = (index) => {
        setModeBtnClicked(index === modeBtnClicked ? index : index)
    }

    return (
        <div className="container-modifier-mode" style={{ height: step === 1 ? '450px' : step === 2 ? 'initial' : 'initial' }}>
            <div className="progress-bar">
                <div className="progress-part" style={{ borderRadius: '4px', width: '33%', backgroundColor: step >= 1 ? 'transparent' : '#00000020' }}>
                    <span style={{ width: step >= 1 ? '100%' : '0px' }}></span>
                </div>
                <div className="progress-part" style={{ borderRadius: '4px', width: '33%', backgroundColor: step >= 2 ? 'transparent' : '#00000020' }}>
                    <span style={{ width: step >= 2 ? '100%' : '0px' }}></span>
                </div>
                <div className="progress-part" style={{ borderRadius: '4px', width: '33%', backgroundColor: step >= 3 ? 'transparent' : '#00000020' }}>
                    <span style={{ width: step >= 3 ? '100%' : '0px' }}></span>
                </div>
            </div>
            <h2>modifier le mode</h2>
            <div className="mode-butns">
                {modeBtns.map((btn, index) => (
                    <button onClick={() => { toggle(index); setStep(1); }} className={index === modeBtnClicked ? 'clicked' : null}>{btn.title}</button>
                ))}
            </div>

            {modeBtns[modeBtnClicked].component}

        </div>
    )
}

const ModifierModeSemestre = (props) => {

    const heightRef = useRef(null);

    useEffect(() => {
        function adjustListHeight() {
            const container = document.querySelector('.container-modifier-mode');
            const btnElement = container.querySelector('.container-modifier-mode h2');
            const progresssBar = container.querySelector('.container-modifier-mode .progress-bar')
            const titleElement = container.querySelector('.container-modifier-mode .mode-butns');

            const titleAndButtonsHeight = titleElement.getBoundingClientRect().height + btnElement.getBoundingClientRect().height + progresssBar.getBoundingClientRect().height;
            const containerHeight = container.getBoundingClientRect().height;
            const remainingHeight = containerHeight - titleAndButtonsHeight;
            heightRef.current.style.height = `${remainingHeight}px`;
        }

        window.addEventListener('resize', adjustListHeight);
        adjustListHeight(); // Adjust height initially

        return () => {
            window.removeEventListener('resize', adjustListHeight);
        };
    }, []);

    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
        setInputType('date');
    };

    const handleBlur = () => {
        setInputType('text');
    };

    const [inputType1, setInputType1] = useState('text');

    const handleFocus1 = () => {
        setInputType1('date');
    };

    const handleBlur1 = () => {
        setInputType1('text');
    };

    const { modeSemestriel, setModeSemestriel } = useContext(AppContext);

    const { modeType } = useContext(AppContext);

    const [newModeSemestriel, setNewModeSemestriel] = useState(modeType === 'semestre' ? {
        dateDebut: modeSemestriel.dateDebut,
        dateFin: modeSemestriel.dateFin,
        chargeCours: modeSemestriel.chargeCours,
        chargeTD: modeSemestriel.chargeTD,
        chargeTP: modeSemestriel.chargeTP,
        tauxCours: modeSemestriel.tauxCours,
        tauxTD: modeSemestriel.tauxTD,
        tauxTP: modeSemestriel.tauxTP,
        PUProf: modeSemestriel.PUProf,
        PUMCA: modeSemestriel.PUMCA,
        PUMCB: modeSemestriel.PUMCB,
        PUMAA: modeSemestriel.PUMAA,
        PUMAB: modeSemestriel.PUMAB,
        PSec: modeSemestriel.PSec,
        PIRG: modeSemestriel.PIRG,
    } : {
        dateDebut: '',
        dateFin: '',
        chargeCours: '',
        chargeTD: '',
        chargeTP: '',
        tauxCours: '',
        tauxTD: '',
        tauxTP: '',
        PUProf: '',
        PUMCA: '',
        PUMCB: '',
        PUMAA: '',
        PUMAB: '',
        PSec: '',
        PIRG: '',
    });

    const handleSubmit = () => {
        props.handleChange();
    }

    const handleSubmitFinal = () => {
        setModeSemestriel(newModeSemestriel);
        props.handleSwitchMode('semestre');
        props.annulerModifierMode();
    }

    return (
        <>
            {props.step === 1 && (
                <form ref={heightRef} onSubmit={handleSubmit} >

                    <div className="input-line">
                        <label htmlFor="debutSemestre">date debut semestre</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType} placeholder=""
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            value={newModeSemestriel.dateDebut}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, dateDebut: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="finSemestre">date fin semestre</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType1} placeholder=""
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            required
                            value={newModeSemestriel.dateFin}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, dateFin: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="chargeCours">charge cours</label>
                        <input
                            type="number"
                            min={'1'}
                            max={'20'}
                            step={0.25}
                            required
                            value={newModeSemestriel.chargeCours}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, chargeCours: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="cours">charge TD</label>
                        <input
                            type="number"
                            min={'1'} max={'20'}
                            step={0.25}
                            required
                            value={newModeSemestriel.chargeTD}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, chargeTD: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="td">charge TP</label>
                        <input
                            type="number"
                            min={'1'} max={'20'}
                            step={0.25}
                            required
                            value={newModeSemestriel.chargeTP}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, chargeTP: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="tp">pourcentage cours</label>
                        <input
                            type="number"
                            step={0.25}
                            required
                            value={newModeSemestriel.tauxCours}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, tauxCours: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="tp">pourcentage TD</label>
                        <input
                            type="number"
                            step={0.25}
                            required
                            value={newModeSemestriel.tauxTD}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, tauxTD: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="tp">pourcentage TP</label>
                        <input
                            type="number"
                            step={0.25}
                            required
                            value={newModeSemestriel.tauxTP}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, tauxTP: e.target.value })}
                        />
                    </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit" >sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 2 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={handleSubmit}>

                    <div className="input-line">
                        <label htmlFor="PUprofrsseur">Prix unitaire professeur</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeSemestriel.PUProf}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, PUProf: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmca">Prix unitaire MCA</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeSemestriel.PUMCA}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, PUMCA: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmcb">Prix unitaire MCB</label>
                        <input
                            type="number"
                            required
                            value={newModeSemestriel.PUMCB}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, PUMCB: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmaa">Prix unitaire MAA</label>
                        <input
                            type="number"
                            required
                            value={newModeSemestriel.PUMAA}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, PUMAA: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmab">Prix unitaire MAB</label>
                        <input
                            type="number"
                            required
                            value={newModeSemestriel.PUMAB}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, PUMAB: e.target.value })}
                        />
                    </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit">sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 3 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={handleSubmitFinal}>

                    <div className="input-line">
                        <label htmlFor="pourcentageSec">pourcentage sec</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeSemestriel.PSec}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, PSec: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="pourcentageIrg">pourcentage IRG</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeSemestriel.PIRG}
                            onChange={(e) => setNewModeSemestriel({ ...newModeSemestriel, PIRG: e.target.value })}
                        />
                    </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit">calculer</button>
                    </div>
                </form>
            )}
        </>
    )
}

const ModifierModeAnnuel = (props) => {

    const heightRef = useRef(null);

    useEffect(() => {
        function adjustListHeight() {
            const container = document.querySelector('.container-modifier-mode');
            const btnElement = container.querySelector('.container-modifier-mode h2');
            const titleElement = container.querySelector('.container-modifier-mode .mode-butns');

            const titleAndButtonsHeight = titleElement.getBoundingClientRect().height + btnElement.getBoundingClientRect().height;
            const containerHeight = container.getBoundingClientRect().height;
            const remainingHeight = containerHeight - titleAndButtonsHeight;
            heightRef.current.style.height = `${remainingHeight}px`;
        }

        window.addEventListener('resize', adjustListHeight);
        adjustListHeight(); // Adjust height initially

        return () => {
            window.removeEventListener('resize', adjustListHeight);
        };
    }, []);

    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
        setInputType('date');
    };

    const handleBlur = () => {
        setInputType('text');
    };

    const [inputType1, setInputType1] = useState('text');

    const handleFocus1 = () => {
        setInputType1('date');
    };

    const handleBlur1 = () => {
        setInputType1('text');
    };

    const { modeSemestriel, setModeSemestriel } = useContext(AppContext);

    const { modeType } = useContext(AppContext);

    const [newModeAnnuel, setNewModeAnnuel] = useState(modeType === 'annuel' ? {
        dateDebut: modeSemestriel.dateDebut,
        dateFin: modeSemestriel.dateFin,
        chargeCours: modeSemestriel.chargeCours,
        chargeTD: modeSemestriel.chargeTD,
        chargeTP: modeSemestriel.chargeTP,
        tauxCours: modeSemestriel.tauxCours,
        tauxTD: modeSemestriel.tauxTD,
        tauxTP: modeSemestriel.tauxTP,
        PUProf: modeSemestriel.PUProf,
        PUMCA: modeSemestriel.PUMCA,
        PUMCB: modeSemestriel.PUMCB,
        PUMAA: modeSemestriel.PUMAA,
        PUMAB: modeSemestriel.PUMAB,
        PSec: modeSemestriel.PSec,
        PIRG: modeSemestriel.PIRG,
    } : {
        dateDebut: '',
        dateFin: '',
        chargeCours: '',
        chargeTD: '',
        chargeTP: '',
        tauxCours: '',
        tauxTD: '',
        tauxTP: '',
        PUProf: '',
        PUMCA: '',
        PUMCB: '',
        PUMAA: '',
        PUMAB: '',
        PSec: '',
        PIRG: '',
    });

    const handleSubmit = () => {
        props.handleChange();
    }

    const handleSubmitFinal = () => {
        setModeSemestriel(newModeAnnuel);
        props.handleSwitchMode('annuel');
        props.annulerModifierMode();
    }

    return (
        <>
            {props.step === 1 && (
                <form ref={heightRef} onSubmit={handleSubmit} >

                    <div className="input-line">
                        <label htmlFor="debutSemestre">date debut année</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType} placeholder=""
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            value={newModeAnnuel.dateDebut}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, dateDebut: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="finSemestre">date fin année</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType1} placeholder=""
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            required
                            value={newModeAnnuel.dateFin}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, dateFin: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="chargeCours">charge cours</label>
                        <input
                            type="number"
                            min={'1'}
                            max={'20'}
                            step={0.25}
                            required
                            value={newModeAnnuel.chargeCours}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, chargeCours: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="cours">charge TD</label>
                        <input
                            type="number"
                            min={'1'} max={'20'}
                            step={0.25}
                            required
                            value={newModeAnnuel.chargeTD}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, chargeTD: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="td">charge TP</label>
                        <input
                            type="number"
                            min={'1'} max={'20'}
                            step={0.25}
                            required
                            value={newModeAnnuel.chargeTP}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, chargeTP: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="tp">pourcentage cours</label>
                        <input
                            type="number"
                            step={0.25}
                            required
                            value={newModeAnnuel.tauxCours}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, tauxCours: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="tp">pourcentage TD</label>
                        <input
                            type="number"
                            step={0.25}
                            required
                            value={newModeAnnuel.tauxTD}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, tauxTD: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="tp">pourcentage TP</label>
                        <input
                            type="number"
                            step={0.25}
                            required
                            value={newModeAnnuel.tauxTP}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, tauxTP: e.target.value })}
                        />
                    </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit" >sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 2 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={handleSubmit}>

                    <div className="input-line">
                        <label htmlFor="PUprofrsseur">PU professeur</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeAnnuel.PUProf}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, PUProf: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmca">PU MCA</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeAnnuel.PUMCA}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, PUMCA: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmcb">PU MCB</label>
                        <input
                            type="number"
                            required
                            value={newModeAnnuel.PUMCB}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, PUMCB: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmaa">PU MAA</label>
                        <input
                            type="number"
                            required
                            value={newModeAnnuel.PUMAA}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, PUMAA: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="PUmab">PU MAB</label>
                        <input
                            type="number"
                            required
                            value={newModeAnnuel.PUMAB}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, PUMAB: e.target.value })}
                        />
                    </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit">sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 3 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={handleSubmitFinal}>

                    <div className="input-line">
                        <label htmlFor="pourcentageSec">pourcentage sec</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeAnnuel.PSec}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, PSec: e.target.value })}
                        />
                    </div>

                    <div className="input-line">
                        <label htmlFor="pourcentageIrg">pourcentage IRG</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type="number"
                            required
                            value={newModeAnnuel.PIRG}
                            onChange={(e) => setNewModeAnnuel({ ...newModeAnnuel, PIRG: e.target.value })}
                        />
                    </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit">calculer</button>
                    </div>
                </form>
            )}
        </>
    )
}

//------------Inteface warning---------------//

const Warning2 = (props) => {
    return (
        <div className="warning-container">
            <div className="warning-circle">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4993 32.0832C25.5535 32.0832 32.0827 25.554 32.0827 17.4998C32.0827 9.44568 25.5535 2.9165 17.4993 2.9165C9.4452 2.9165 2.91602 9.44568 2.91602 17.4998C2.91602 25.554 9.4452 32.0832 17.4993 32.0832Z" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.5 11.6667V17.5" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.5 23.3333H17.5138" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <p>Vous devez saisie les paramétres de calcul avant</p>
            <div className="warning-btns">
                <button onClick={() => props.compris()}>OK</button>
            </div>
        </div>
    )
}

//----------Interface de confirmation-----------//

const Confirmation = (props) => {
    return (
        <div className="warning-container">
            <div className="confirmation-circle">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 0.916626C7.47916 0.916626 0.916664 7.47913 0.916664 15.5C0.916664 23.5208 7.47916 30.0833 15.5 30.0833C23.5208 30.0833 30.0833 23.5208 30.0833 15.5C30.0833 7.47913 23.5208 0.916626 15.5 0.916626ZM15.5 27.1666C9.06875 27.1666 3.83333 21.9312 3.83333 15.5C3.83333 9.06871 9.06875 3.83329 15.5 3.83329C21.9312 3.83329 27.1667 9.06871 27.1667 15.5C27.1667 21.9312 21.9312 27.1666 15.5 27.1666ZM22.1937 9.05413L12.5833 18.6645L8.80625 14.902L6.75 16.9583L12.5833 22.7916L24.25 11.125L22.1937 9.05413Z" fill="#389D48" />
                </svg>
            </div>
            <p>La procèdure du calcul a terminer avec succès</p>
            <div className="warning-btns confirmation-btns">
                <button onClick={() => props.compris()}>OK</button>
            </div>
        </div>
    )
}