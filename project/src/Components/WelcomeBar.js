import React from "react";
import '../Styles/Userbar.css'

export const WelcomeBar = () => {
    const user = {
        id: 1,
        name: 'Soumia Kouadri',
        img: '../../picture.jpeg',
    }
    return (
        <div className="topbar-container">
                <span>Welcome, {user.name}
                    <span className="svg-container">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9 9H9.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 9H15.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </span>
            <div className="notification-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_263_176)">
                        <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="19.5" cy="4.5" r="4.5" fill="#F91616" />
                        <path d="M19.46 7.06C19.2367 7.06 19.035 7.02 18.855 6.94C18.675 6.85667 18.53 6.73333 18.42 6.57C18.3133 6.40667 18.2567 6.20333 18.25 5.96H18.675C18.6783 6.16 18.7483 6.33333 18.885 6.48C19.0217 6.62333 19.2133 6.695 19.46 6.695C19.7067 6.695 19.8917 6.62667 20.015 6.49C20.1417 6.35333 20.205 6.18833 20.205 5.995C20.205 5.83167 20.165 5.69833 20.085 5.595C20.0083 5.49167 19.9033 5.415 19.77 5.365C19.64 5.315 19.4967 5.29 19.34 5.29H19.08V4.935H19.34C19.5667 4.935 19.7433 4.88333 19.87 4.78C20 4.67667 20.065 4.53167 20.065 4.345C20.065 4.18833 20.0133 4.06 19.91 3.96C19.81 3.85667 19.66 3.805 19.46 3.805C19.2667 3.805 19.1117 3.86333 18.995 3.98C18.8783 4.09333 18.8133 4.23667 18.8 4.41H18.375C18.385 4.22 18.435 4.05167 18.525 3.905C18.6183 3.75833 18.745 3.645 18.905 3.565C19.065 3.48167 19.25 3.44 19.46 3.44C19.6867 3.44 19.875 3.48 20.025 3.56C20.1783 3.64 20.2933 3.74667 20.37 3.88C20.45 4.01333 20.49 4.16 20.49 4.32C20.49 4.49667 20.4417 4.65833 20.345 4.805C20.2483 4.94833 20.1033 5.045 19.91 5.095C20.1167 5.13833 20.2883 5.23667 20.425 5.39C20.5617 5.54333 20.63 5.745 20.63 5.995C20.63 6.18833 20.585 6.36667 20.495 6.53C20.4083 6.69 20.2783 6.81833 20.105 6.915C19.9317 7.01167 19.7167 7.06 19.46 7.06Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_263_176">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <div className="img-circle">
                    <img src={user.img}  />
                </div>

            </div>

        </div>
    )
}