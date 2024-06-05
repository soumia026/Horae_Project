import React, { useContext, useEffect, useState } from "react";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '..//Styles/Comptabilite.css';
import html2canvas from 'html2canvas';
import { AppContext } from "../App";
import axios from "axios";

export const Comptabilite = (props) => {
    const generatePDF = () => {
        // Get the content element to be captured
        const content = document.getElementById('comptabilite-infos');

        // Use html2canvas to capture the content as an image
        html2canvas(content).then(canvas => {
            // Convert the captured image to data URL
            const imgData = canvas.toDataURL('image/png');

            // Calculate the dimensions of the PDF page based on the captured image
            const imgWidth = 210; // A4 page width in mm
            const imgHeight = canvas.height * imgWidth / canvas.width; // Adjust height based on aspect ratio

            // Create a new PDF document
            const doc = new jsPDF('p', 'mm', 'a4');

            // Add the captured image to the PDF document
            doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Save the PDF document
            doc.save('comptabilite.pdf');
        });
    };

    const { modeSemestriel } = useContext(AppContext);

    const [prixUnitaire, setPrixUnitaire] = useState(null);

    useEffect(() => {
        const recupereGrade = () => {
            if (props.Grade === 'Professor') {
                setPrixUnitaire(modeSemestriel.PUProf)
            } else if (props.Grade === 'MCA') {
                setPrixUnitaire(modeSemestriel.PUMCA)
            } else if (props.Grade === 'MCB') {
                setPrixUnitaire(modeSemestriel.PUMCB)
            } else if (props.Grade === 'MAA') {
                setPrixUnitaire(modeSemestriel.PUMAA)
            } else {
                setPrixUnitaire(modeSemestriel.PUMAB)
            }
        }
        recupereGrade();
    }, [props.Grade, modeSemestriel.PUProf, modeSemestriel.PUMCA, modeSemestriel.PUMCB, modeSemestriel.PUMAA, modeSemestriel.PUMAB])

    const curentDate = new Date();
    const [calculSuccess, setCalculSuccess] = useState(new Date(modeSemestriel.dateFin) <= curentDate);

    const [montant, setMontant] = useState({
        idMontant: '',
        somme: '',
        anneeUniversiatire: '',
        semestre: '',
        matricule: ''
    })

    useEffect(() => {
        if (new Date(modeSemestriel.dateFin) > curentDate) {
            setCalculSuccess(false)
        } else {
            axios.get(`http://127.0.0.1:8000/Administration/get_montant/${props.Matricule}/`)
                .then((res) => {
                    setCalculSuccess(true);
                    setMontant(res.data.montant);
                })
                .catch((err) => {
                    console.log(err.data)
                })
        }
    }, [curentDate, modeSemestriel.dateFin, props.Matricule])

    return (
        <div className="comptabilite-container">
            <div className="telecharger-container">
                <button onClick={generatePDF} style={{ border: 'none' }} className="telecharger-btn1">Télécharger</button>
            </div>

            {calculSuccess &&

                <div id="comptabilite-infos" >
                    <div className="table-comptabilite" >
                        <table>
                            <tr >
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        Matricule
                                    </span>
                                    <p>
                                        {props.Matricule}
                                    </p>
                                </td>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        Nom & Prénom
                                    </span>
                                    <p>
                                        {props.Nom} {props.Prenom}
                                    </p>
                                </td>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        Grade
                                    </span>
                                    <p>
                                        {props.Grade}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        Mode de paiment
                                    </span>
                                    <p>
                                        CCP
                                    </p>
                                </td>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        prix unitaire
                                    </span>
                                    <p>
                                        {prixUnitaire}
                                    </p>
                                </td>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        nombre d'heures
                                    </span>
                                    <p>
                                        20
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        securite SEC
                                    </span>
                                    <p>
                                        {modeSemestriel.PSec}%
                                    </p>
                                </td>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>
                                    <span>
                                        IRG
                                    </span>
                                    <p>
                                        {modeSemestriel.PIRG}%
                                    </p>
                                </td>
                                <td style={{ borderBottom: '1.5px #00000015 solid;' }}>

                                </td>
                            </tr>
                        </table>

                        <div className="montant-container-comptabilite">
                            <div className="montant-box">
                                <span>
                                    montant total
                                </span>
                                <p>
                                    88765,0
                                </p>
                            </div>
                            <div className="line-deco" />
                            <div className="montant-box">
                                <span>
                                    montant débit
                                </span>
                                <p>
                                    88765,0
                                </p>
                            </div>
                            <div className="line-deco" />
                            <div className="montant-box">
                                <span>
                                    montant net
                                </span>
                                <p>
                                    {montant.somme}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {!calculSuccess &&
                <MontanatNonCalcule />
            }
        </div>
    )
}

//--------Interface nonCalcul-------//

const MontanatNonCalcule = (props) => {
    return (
        <div className="warning-container">
            <div className="warning-circle">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4993 32.0832C25.5535 32.0832 32.0827 25.554 32.0827 17.4998C32.0827 9.44568 25.5535 2.9165 17.4993 2.9165C9.4452 2.9165 2.91602 9.44568 2.91602 17.4998C2.91602 25.554 9.4452 32.0832 17.4993 32.0832Z" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.5 11.6667V17.5" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.5 23.3333H17.5138" stroke="#F80707" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <p>Le montant ne peux pas etre calculer avant la fin de semestre</p>

        </div>
    )
}