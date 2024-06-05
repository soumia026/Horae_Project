import React, { useState } from "react";
import '../Styles/Archive.css'
import axios from "axios";

export function Archive() {
    
    const [type, setType] = useState('pdf');


    const handleDownload = (e) => {
        e.preventDefault();
        let url = '';
        if (type === 'pdf') {
            url = 'http://127.0.0.1:8000/Administration/exporter_donnees_pdf/';
        } else {
            url = 'http://127.0.0.1:8000/Administration/exporter_donnees_excel/';
        }
    
        // Créer un lien temporaire et déclencher le téléchargement
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'archivageDesDonnees.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="main-container archive-container">
            <div className="Bandd">
                <p className="ens">Archeive</p>
            </div>
            <div className="imprimer-container">
                <h3>Voulez-vous exporter toutes les informations du l'année scolaire ?</h3>
                <form onSubmit={handleDownload}>
                    <div className="input-line">
                        <label htmlFor="type">Format</label>
                        <select onChange={(e) => setType(e.target.value)}>
                            <option value={'pdf'}>PDF</option>
                            <option value={'excel'}>Excel</option>
                        </select>
                    </div>
                    <div className="btn-container">
                        <button type="submit" className="document-btn">Confirmer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}