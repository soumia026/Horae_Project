import React, { Component, useEffect, useState } from "react";
import '../Styles/Calcul.css'
import { useRef } from "react";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export function Calendrier() {

    const evenements = [
        {
            nom: 'eid el fitre',
            dateDebut: '2024-04-10',
            dateFin: '2024-04-13'
        },
        {
            nom: 'eid el fitre',
            dateDebut: '2024-04-10',
            dateFin: '2024-04-13'
        },
        {
            nom: 'eid el fitre',
            dateDebut: '2024-04-10',
            dateFin: '2024-04-13'
        },
        {
            nom: 'eid el fitre',
            dateDebut: '2024-04-10',
            dateFin: '2024-04-13'
        },
        {
            nom: 'eid el fitre',
            dateDebut: '2024-04-10',
            dateFin: '2024-04-13'
        }
    ]

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

    return (
        <div className="main-container calendrier-container">
            <h2>calcul</h2>
            <div className="grid-container">
                <div className="type-payment">
                    <div className="title-line">
                        <h2>Calcul En Mode Semestriel</h2>
                        <div className="circle" style={{cursor: 'pointer'}}>
                            <svg onClick={() => { setModifierModeClicked(true) }} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <div className="container-parametres">
                        <div className="parametres-heure">
                            <div className="les-parametres">
                                <table>
                                    <tr>
                                        <td >
                                            <span>date debut semestre: </span>
                                            <p>8/9/2024</p>
                                        </td>
                                        <td>
                                            <span>date fin semestre: </span>
                                            <p>8/9/2024</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <span>charge cours: </span>
                                            <p>9</p>
                                        </td>
                                        <td>
                                            <span>charge td: </span>
                                            <p>6</p>
                                        </td>
                                        <td>
                                            <span>charge tp: </span>
                                            <p>4</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <span>pourcentage cours: </span>
                                            <p>1.5</p>
                                        </td>
                                        <td>
                                            <span>pourcentage td: </span>
                                            <p>1</p>
                                        </td>
                                        <td>
                                            <span>pourcentage tp: </span>
                                            <p>0.75</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <span>PU professeur: </span>
                                            <p>920</p>
                                        </td>
                                        <td>
                                            <span>PU MCA: </span>
                                            <p>840</p>
                                        </td>
                                        <td>
                                            <span>PU MCB: </span>
                                            <p>820</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <span>PU MAA: </span>
                                            <p>740</p>
                                        </td>
                                        <td>
                                            <span>PU MAB: </span>
                                            <p>720</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <span>Pourcentage Sec Sociale: </span>
                                            <p>11%</p>
                                        </td>
                                        <td>
                                            <span>Pourcentage IRG </span>
                                            <p>6%</p>
                                        </td>
                                    </tr>

                                </table>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="container-evenements">
                    <button className="ajouter-evenement" onClick={() => { setAjouterEvenementClicked(true) }}>Ajouter un evenement</button>
                    <h3 className="big-title">evenements spéciales</h3>
                    <div className="dynamic-list">
                        {evenements.map((evenement) => (
                            <EvenementLigne
                                nom={evenement.nom}
                                dateDebut={evenement.dateDebut}
                                dateFin={evenement.dateFin}
                                handleEvenement={() => setUpdateEvenement(evenement)}
                            />
                        ))}
                    </div>
                </div>

                {ajouterEvenementClicked && <AjouterEvenement annulerAjouteEvenement={annulerAjouteEvenement} />}

                {modifierModeClicked && <ModifierMode annulerModifierMode={annulerModifierMode} />}

                {updateEvenement && <ModifierEvenement evenement={updateEvenement} annulerModifierEvenement={annulerModifierEvenement} />}

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
                    <svg width="17" cursor={'pointer'} height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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

    const schema = yup.object().shape({
        nomEvenement: yup.string().required("le champ nom est obligatoire"),
        dateDebut: yup.string().required("le champ date debut evenement est obligatoire"),
        dateFin: yup.string().required("le champ date fin evenement est obligatoire"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="container-ajouter-evenement">
            <h2>ajouter un evenement</h2>
            <div className="line-decoration" />
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-container">
                    <div className="input-line">
                        <label htmlFor="nom">evenement</label>
                        <input type="text" {...register('nomEvenement')} />
                    </div>
                    {errors.nomEvenement && <p>{errors.nomEvenement?.message}</p>}
                </div>

                <div className="input-container">
                    <div className="input-line">
                        <label htmlFor="dateDebut">date debut</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType}
                            placeholder=""
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            {...register('dateDebut')}
                        />
                    </div>
                    {errors.dateDebut && <p>{errors.dateDebut?.message}</p>}
                </div>

                <div className="input-container">
                    <div className="input-line">
                        <label htmlFor="dateFin">date fin</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType1}
                            placeholder=""
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            {...register('dateFin')}
                        />
                    </div>
                    {errors.dateFin && <p>{errors.dateFin?.message}</p>}
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

    const schema = yup.object().shape({
        nomEvenement: yup.string().required("le champ nom est obligatoire"),
        dateDebut: yup.string().required("le champ date debut evenement est obligatoire"),
        dateFin: yup.string().required("le champ date fin evenement est obligatoire"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="container-ajouter-evenement">
            <h2>ajouter un evenement</h2>
            <div className="line-decoration" />
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-container">
                    <div className="input-line">
                        <label htmlFor="nom">evenement</label>
                        <input
                            type="text"
                            value={props.evenement.nom}
                            {...register('nomEvenement')}
                        />
                    </div>
                    {errors.nomEvenement && <p>{errors.nomEvenement?.message}</p>}
                </div>

                <div className="input-container">
                    <div className="input-line">
                        <label htmlFor="dateDebut">date debut</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType}
                            value={props.evenement.dateDebut}
                            placeholder=""
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            {...register('dateDebut')}
                        />
                    </div>
                    {errors.dateDebut && <p>{errors.dateDebut?.message}</p>}
                </div>

                <div className="input-container">
                    <div className="input-line">
                        <label htmlFor="dateFin">date fin</label>
                        <input
                            style={{ textTransform: 'lowercase' }}
                            type={inputType1}
                            value={props.evenement.dateFin}
                            placeholder=""
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            {...register('dateFin')}
                        />
                    </div>
                    {errors.dateFin && <p>{errors.dateFin?.message}</p>}
                </div>

                <div className="ajoute-evenement-btns">
                    <button className="annuler-btn" onClick={() => props.annulerModifierEvenement()}>annuler</button>
                    <button className="sauvegarder-btn" type="submit">sauvegarder</button>
                </div>
            </form>
        </div>
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
            component: <ModifierModeSemestre step={step} handleChange={handleChange} annulerModifierMode={props.annulerModifierMode} />
        },
        {
            title: 'annuel',
            component: <ModifierModeAnnuel step={step} handleChange={handleChange} annulerModifierMode={props.annulerModifierMode} />
        }
    ]

    const toggle = (index) => {
        setModeBtnClicked(index === modeBtnClicked ? null : index)
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



    const onSubmit = () => {
        props.handleChange();
        console.log('rr')
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
        setInputType1('date');
    };

    const handleBlur1 = () => {
        setInputType1('text');
    };

    return (
        <>
            {props.step === 1 && (
                <form ref={heightRef} onSubmit={onSubmit} >

                        <div className="input-line">
                            <label htmlFor="debutSemestre">date debut semestre</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type={inputType} placeholder=""
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                               
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="finSemestre">date fin semestre</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type={inputType1} placeholder=""
                                onFocus={handleFocus1}
                                onBlur={handleBlur1}
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="chargeCours">charge cours</label>
                            <input type="number" min={'1'} max={'20'} step={0.25} />
                        </div>

                        <div className="input-line">
                            <label htmlFor="cours">charge TD</label>
                            <input type="number" min={'1'} max={'20'} step={0.25} />
                        </div>

                        <div className="input-line">
                            <label htmlFor="td">charge TP</label>
                            <input type="number" min={'1'} max={'20'} step={0.25}  />
                        </div>

                        <div className="input-line">
                            <label htmlFor="tp">pourcentage cours</label>
                            <input type="number" step={0.25} />
                        </div>

                        <div className="input-line">
                            <label htmlFor="tp">pourcentage TD</label>
                            <input type="number" step={0.25} />
                        </div>

                        <div className="input-line">
                            <label htmlFor="tp">pourcentage TP</label>
                            <input type="number" step={0.25} />
                        </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit" >sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 2 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={onSubmit}>

                        <div className="input-line">
                            <label htmlFor="PUprofrsseur">PU professeur</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="number"
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmca">PU MCA</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="number"
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmcb">PU MCB</label>
                            <input type="number" />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmaa">PU MAA</label>
                            <input type="number"  />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmab">PU MAB</label>
                            <input type="number"  />
                        </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit">sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 3 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={onSubmit}>
                
                        <div className="input-line">
                            <label htmlFor="pourcentageSec">pourcentage sec</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="number"
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="pourcentageIrg">pourcentage IRG</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="number"
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

    
    
   

    const onSubmit = (data) => {
        props.handleChange();
        console.log('rrr')
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
        setInputType1('date');
    };

    const handleBlur1 = () => {
        setInputType1('text');
    };

    return (
        <>
            {props.step === 1 && (
                <form ref={heightRef} onSubmit={onSubmit} >
                    
                        <div className="input-line">
                            <label htmlFor="debutAnnee">date debut année</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type={inputType} placeholder=""
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        
                    
                        <div className="input-line">
                            <label htmlFor="finAnnee">date fin année</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type={inputType1} placeholder=""
                                onFocus={handleFocus1}
                                onBlur={handleBlur1}
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="chargeCours">charge cours</label>
                            <input type="number" min={'1'} max={'20'}  />
                        </div>
                    
                        <div className="input-line">
                            <label htmlFor="cours">charge TD</label>
                            <input type="number" min={'1'} max={'20'}  />
                        </div>
                        
                   
                        <div className="input-line">
                            <label htmlFor="td">charge TP</label>
                            <input type="number" min={'1'} max={'20'}  />
                        </div>
                    
                        <div className="input-line">
                            <label htmlFor="tp">pourcentage cours</label>
                            <input type="text" />
                        </div>

                        <div className="input-line">
                            <label htmlFor="tp">pourcentage TD</label>
                            <input type="text" />
                        </div>
                  
                        <div className="input-line">
                            <label htmlFor="tp">pourcentage TP</label>
                            <input type="text" />
                        </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit" >sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 2 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={onSubmit}>
                    
                        <div className="input-line">
                            <label htmlFor="PUprofrsseur">PU professeur</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="text"
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmca">PU MCA</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="text"
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmcb">PU MCB</label>
                            <input type="text" />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmaa">PU MAA</label>
                            <input type="text" />
                        </div>

                        <div className="input-line">
                            <label htmlFor="PUmab">PU MAB</label>
                            <input type="text" />
                        </div>

                    <div className="modifier-mode-btns">
                        <button className="annuler-btn" onClick={() => { props.annulerModifierMode() }}>annuler</button>
                        <button className="sauvegarder-btn" type="submit">sauvegarder</button>
                    </div>
                </form>
            )}

            {props.step === 3 && (
                <form style={{ alignItems: 'center' }} ref={heightRef} onSubmit={onSubmit}>
                    <div className="input-container">
                       
                            <label htmlFor="pourcentageSec">pourcentage sec</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="text"
                            />
                        </div>

                        <div className="input-line">
                            <label htmlFor="pourcentageIrg">pourcentage IRG</label>
                            <input
                                style={{ textTransform: 'lowercase' }}
                                type="text"
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