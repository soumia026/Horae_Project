import React, { useEffect } from "react";
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


    const data = {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Fev", "Mar", "Avr", "Mai", "juin", "Juill", "out"],
        datasets: [
            {
                label: "absences",
                data: [5, 6, 2, 10, 1, 3, 0, 2, 7, 12, 0, 1],
                backgroundColor: "#B8CEF7",
                barThickness: 30,
                barPercentage: 0.9, // Adjust the width of the bars
                categoryPercentage: 0.8, // Adjust the width of each category
                barBorderRadius: 20,
            }
        ]
    }

    return (
        <div className="main-container dashboard-container" >
            <h2 className="principal-title">my Dashboard</h2>
            <div className="infos-container">
                <CalculContainer pourcentage={60} />
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
                <ProgressBar completed={props.pourcentage} customLabel="75 jours restants" />
                <div className="dates">
                    <span>06/06/2024</span>
                    <span>02/03/2024</span>
                </div>
            </div>
        </div>
    )
}

const EvenementContainer = () => {
    return (
        <div className="evenements-container">
            <h2>Evénements à venir!</h2>
            <div className="les-evenements">
                <div className="un-evenement">
                    <div className="title">eid el fitre</div>
                    <div className="date-line">
                        <p>date debut:</p>
                        <span>06/06/2024</span>
                    </div>
                    <div className="date-line">
                        <p>date debut:</p>
                        <span>06/06/2024</span>
                    </div>
                </div>

                <div className="un-evenement">
                    <div className="title">eid el fitre</div>
                    <div className="date-line">
                        <p>date debut:</p>
                        <span>06/06/2024</span>
                    </div>
                    <div className="date-line">
                        <p>date debut:</p>
                        <span>06/06/2024</span>
                    </div>
                </div>
            </div>
        </div>
    )
}