import React, { useContext, useEffect, useState } from "react";
import '../Styles/Dashboard.css';
import ProgressBar from "@ramonak/react-progress-bar";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { AppContext } from "../App";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function Dashboard() {

    const options = {
        plugins: {
            legend: {
                display: false // This hides the legend
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // Hides vertical gridlines
                }
            },
            y: {
                display: false // Hides the y-axis
            }
        }
    };

    const [absences, setAbsences] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/Administration/absences/')
            .then((res) => {
                setAbsences(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const getAbsencesByMonth = (month) => {
        return absences.filter(absence => {
            const absenceMonth = absence.DateAbs.split('-')[1]; //split ghadi koul ma tl9a - t9ssm klma w mb3da troudhm fi un table w ana rani recupere fi 2eme mot
            return absenceMonth === month;
        }).length;
    };


    const data = {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Fev", "Mar", "Avr", "Mai", "juin", "Juill", "out"],
        datasets: [
            {
                label: "absences",
                data: [
                    getAbsencesByMonth("09"),
                    getAbsencesByMonth("10"),
                    getAbsencesByMonth("11"),
                    getAbsencesByMonth("12"),
                    getAbsencesByMonth("01"),
                    getAbsencesByMonth("02"),
                    getAbsencesByMonth("03"),
                    getAbsencesByMonth("04"),
                    getAbsencesByMonth("05"),
                    getAbsencesByMonth("06"),
                    getAbsencesByMonth("07"),
                    getAbsencesByMonth("08")],
                backgroundColor: "#B8CEF7",
                barThickness: 30,
                barPercentage: 0.9,
                categoryPercentage: 0.8,
                barBorderRadius: 20,
            }
        ]
    }

    return (
        <div className="main-container dashboard-container" >
            <h2 className="principal-title">table du bord</h2>
            <div className="infos-container">
                <CalculContainer />
                <EvenementContainer />
            </div>

            <div className="charts-container">
                <div className="bar-chart">
                    <div className="title-chart">
                        <div className="circle">
                            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.97425 18.2349C4.06459 18.2349 4.94849 17.351 4.94849 16.2606C4.94849 15.1703 4.06459 14.2864 2.97425 14.2864C1.8839 14.2864 1 15.1703 1 16.2606C1 17.351 1.8839 18.2349 2.97425 18.2349Z" stroke="black" stroke-width="0.833367" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.76331 9.72535C9.85365 9.72535 10.7376 8.84145 10.7376 7.7511C10.7376 6.66075 9.85365 5.77686 8.76331 5.77686C7.67296 5.77686 6.78906 6.66075 6.78906 7.7511C6.78906 8.84145 7.67296 9.72535 8.76331 9.72535Z" stroke="black" stroke-width="0.833367" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.2321 16.2605C13.3224 16.2605 14.2063 15.3766 14.2063 14.2863C14.2063 13.1959 13.3224 12.312 12.2321 12.312C11.1417 12.312 10.2578 13.1959 10.2578 14.2863C10.2578 15.3766 11.1417 16.2605 12.2321 16.2605Z" stroke="black" stroke-width="0.833367" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.027 4.94849C20.1173 4.94849 21.0012 4.06459 21.0012 2.97425C21.0012 1.8839 20.1173 1 19.027 1C17.9366 1 17.0527 1.8839 17.0527 2.97425C17.0527 4.06459 17.9366 4.94849 19.027 4.94849Z" stroke="black" stroke-width="0.833367" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.65496 9.38592L4.08398 14.6278M18.0116 4.66406L13.2477 12.5965M11.3055 12.5402L9.69087 9.49842" stroke="black" stroke-width="0.833367" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h2>Absences</h2>
                    </div>
                    <div className="bar-chart-container">
                        <Bar style={{ width: "50%" }} options={options} data={data} />
                    </div>

                </div>
                <div className="container-calender">
                    <Calendar />
                </div>
            </div>
        </div>
    )
}

// ---------------This is the provider to use in App.js-----------------


//Interfaces

const CalculContainer = (props) => {

    useEffect(() => {
        const remainingPercentage = 100 - props.pourcentage;
        const progressBar = document.querySelector('[role="progressbar"] > div > div > span');
        progressBar.style.right = `-${remainingPercentage}%`;
    }, [props.pourcentage]);


    const { modeSemestriel } = useContext(AppContext);

    const Dates = {
        dateDebut: modeSemestriel.dateDebut,
        dateFin: modeSemestriel.dateFin
    }

    const calculateRemainingPercentage = () => {
        const currentDate = new Date();
        const dateDebut = new Date(Dates.dateDebut);
        const dateFin = new Date(Dates.dateFin);
        const timeDiffTotal = dateFin - dateDebut;
        const timeDiffRemaining = dateFin - currentDate;

        let remainingPercentage;
        if (timeDiffRemaining < 0) {
            remainingPercentage = 100;
        } else {
            remainingPercentage = 100 - (timeDiffRemaining / timeDiffTotal) * 100;
        }
        const daysRemaining = Math.ceil(timeDiffRemaining / (1000 * 60 * 60 * 24));
        console.log(remainingPercentage);
        return {
            percentage: remainingPercentage.toFixed(1),
            daysRemaining
        };
    };

    const remainingPercentage = calculateRemainingPercentage().percentage;
    const daysRemaining = calculateRemainingPercentage().daysRemaining;

    return (
        <div className="calcul-infos">
            <div className="montant-container">
                <div className="montant-info">
                    <h2>500.000 da</h2>
                    <p>fonds</p>
                </div>
                <div className="montant-info">
                    <h2>150.000 da</h2>
                    <p>dépenses</p>
                </div>
            </div>

            <div className="progress-bar">
                <ProgressBar completed={remainingPercentage} customLabel={remainingPercentage != 100 ? `${daysRemaining} jours restants` : 'complet'} />
                <div className="dates">
                    <span>{Dates.dateDebut}</span>
                    <span>{Dates.dateFin}</span>
                </div>
            </div>
        </div>
    )
}

const EvenementContainer = () => {

    const { evenements } = useContext(AppContext);

    const currentDate = new Date();

    const evenementAVenir = evenements
        .filter(event => new Date(event.dateDebut) >= currentDate)
        .sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut));

    return (
        <div className="evenements-container">
            <h2>Evénements à venir!</h2>
            <div className="les-evenements">
                {evenementAVenir.length > 0
                    &&
                    <>
                        {evenementAVenir[0] &&
                            <div className="un-evenement">
                                <div className="title">{evenementAVenir[0].nomEvenement}</div>
                                <div className="date-line">
                                    <p>date debut:</p>
                                    <span>{evenementAVenir[0].dateDebut}</span>
                                </div>
                                <div className="date-line">
                                    <p>date fin:</p>
                                    <span>{evenementAVenir[0].dateFin}</span>
                                </div>
                            </div>
                        }

                        {evenementAVenir[1] &&
                            <div className="un-evenement">
                                <div className="title">{evenementAVenir[1].nomEvenement}</div>
                                <div className="date-line">
                                    <p>date debut:</p>
                                    <span>{evenementAVenir[1].dateDebut}</span>
                                </div>
                                <div className="date-line">
                                    <p>date fin:</p>
                                    <span>{evenementAVenir[1].dateFin}</span>
                                </div>
                            </div>
                        }
                    </>
                }
                {evenementAVenir.length === 0 &&
                    <p>Aucun évenement pour le moument</p>
                }


            </div>
        </div>
    )
}