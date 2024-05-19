import React from "react";
import '../Styles/Archive.css'

export function Archive() {
    return (
        <div className="main-container archive-container">
            <div className="Bandd">
                <p className="ens">Archeive</p>
            </div>
            <div className="imprimer-container">
                <h3>Voulez-vous exporter toutes les informations
                    à partir de la base de données ?</h3>
                <form>
                    <div className="input-line">
                        <label htmlFor="type">Format</label>
                        <select>
                            <option value={'pdf'}>PDF</option>
                            <option value={'excel'}>Excel</option>
                        </select>
                    </div>
                    <div className="btn-container">
                        <button className="document-btn">Confirmer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}