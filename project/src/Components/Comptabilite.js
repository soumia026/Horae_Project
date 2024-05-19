import React from "react";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '..//Styles/Comptabilite.css'

export const Comptabilite = () => {
    const generatePDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4'); // Set orientation to portrait, unit to mm, and size to A4

        // Get the content element and its dimensions
        const content = document.getElementById('comptabilite-infos');
        const contentWidth = content.scrollWidth;
        const contentHeight = content.scrollHeight;

        // Define the PDF page dimensions
        const pageWidth = 210; // A4 page width in mm
        const pageHeight = 270; // A4 page height in mm

        // Calculate the position to center the content
        const xOffset = (pageWidth - contentWidth) / 2;
        const yOffset = (pageHeight - contentHeight) / 2;

        doc.html(content, {
            callback: function (pdf) {
                pdf.save('comptabilite.pdf');
            },
            x: xOffset > 0 ? xOffset : 10, // Ensure xOffset is not negative
            y: yOffset > 0 ? yOffset : 10, // Ensure yOffset is not negative
            width: contentWidth > pageWidth ? pageWidth - 20 : contentWidth, // Ensure content fits within the page width
            windowWidth: content.scrollWidth,
        });
    };

    return (
        <div id="comptabilite-infos" className="comptabilite-container">
            <div className="telecharger-container">
                <button onClick={generatePDF} style={{border: 'none'}} className="telecharger-btn">Télécharger</button>
            </div>
            <div className="table-comptabilite">
                <table>
                    <tr>
                        <td>
                            <span>
                                Mode de paiment
                            </span>
                            <p>
                                CCP
                            </p>
                        </td>
                        <td>
                            <span>
                                prix unitaire
                            </span>
                            <p>
                                840
                            </p>
                        </td>
                        <td>
                            <span>
                                nombre d'heures
                            </span>
                            <p>
                                20
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>
                                securite SEC
                            </span>
                            <p>
                                2000,9
                            </p>
                        </td>
                        <td>
                            <span>
                                IRG
                            </span>
                            <p>
                                40000,5
                            </p>
                        </td>
                        <td>

                        </td>
                    </tr>
                </table>

            <div className="montant-container-comptabilite">
                <div className="montant-box">
                    <span>
                        montant total
                    </span>
                    <p>
                        8008765,0
                    </p>
                </div>
                <div className="line-deco" />
                <div className="montant-box">
                    <span>
                        montant débit
                    </span>
                    <p>
                        8008765,0
                    </p>
                </div>
                <div className="line-deco" />
                <div className="montant-box">
                    <span>
                        montant net
                    </span>
                    <p>
                        8008765,0
                    </p>
                </div>
            </div>
            </div>

        </div>
    )
}