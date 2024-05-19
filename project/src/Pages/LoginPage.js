import React, { useState, useContext } from 'react';
import '../Styles/LoginPage.css';
import eyeFigma from '../Assets/eye.svg';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [userType, setUserType] = useState('enseignant');


    const [user, setUser] = useState({
        Email: '',
        MotDePasse: ''
    });

    const {setEnseignantMat} = useContext(AppContext);
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(userType === 'enseignant' ? 'http://127.0.0.1:8000/Administration/inscription/': 'http://127.0.0.1:8000/Administration/inscription_ecole_administration/', user)
            .then((res) => {
                if (res.status === 201) {
                    if(userType === 'enseignant'){
                        setEnseignantMat(res.data.Matricule)
                        navigate(`/enseignant/${res.data.Matricule}`);
                    }else{
                        navigate(`/admin`);
                    }
                }
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }

    return (
        <div className='bckg'>
            <div className='logo-container2'>
                <div className='logo'>
                <svg width="575" height="157" viewBox="0 0 575 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M72.398 128V30.1505H90.2904V70.828H134.183V30.1505H152.075V128H134.183V85.3656H90.2904V128H72.398ZM203.943 129.677C197.234 129.677 191.176 128.14 185.771 125.065C180.459 121.989 176.219 117.749 173.051 112.344C169.975 106.846 168.438 100.509 168.438 93.3333C168.438 86.1577 170.022 79.8674 173.191 74.4624C176.359 68.9641 180.599 64.6774 185.911 61.6021C191.316 58.5269 197.373 56.9892 204.083 56.9892C210.7 56.9892 216.664 58.5269 221.976 61.6021C227.381 64.6774 231.621 68.9641 234.696 74.4624C237.864 79.8674 239.449 86.1577 239.449 93.3333C239.449 100.509 237.864 106.846 234.696 112.344C231.621 117.749 227.381 121.989 221.976 125.065C216.57 128.14 210.56 129.677 203.943 129.677ZM203.943 114.161C208.603 114.161 212.657 112.437 216.105 108.989C219.553 105.448 221.277 100.229 221.277 93.3333C221.277 86.4373 219.553 81.2652 216.105 77.8172C212.657 74.276 208.649 72.5054 204.083 72.5054C199.33 72.5054 195.23 74.276 191.782 77.8172C188.427 81.2652 186.75 86.4373 186.75 93.3333C186.75 100.229 188.427 105.448 191.782 108.989C195.23 112.437 199.284 114.161 203.943 114.161ZM255.446 128V58.6667H271.382L273.059 71.6667C275.575 67.1935 278.977 63.6523 283.264 61.043C287.643 58.3405 292.769 56.9892 298.64 56.9892V75.8602H293.608C289.694 75.8602 286.199 76.4659 283.124 77.6774C280.049 78.8889 277.626 80.9857 275.855 83.9677C274.178 86.9498 273.339 91.0968 273.339 96.4086V128H255.446ZM334.772 129.677C328.808 129.677 323.916 128.746 320.095 126.882C316.274 124.925 313.432 122.362 311.568 119.194C309.704 116.025 308.772 112.53 308.772 108.71C308.772 102.28 311.288 97.0609 316.321 93.0538C321.353 89.0466 328.901 87.043 338.966 87.043H356.579V85.3656C356.579 80.6129 355.227 77.1183 352.525 74.8817C349.822 72.6452 346.467 71.5269 342.46 71.5269C338.826 71.5269 335.657 72.4122 332.955 74.1828C330.252 75.8602 328.575 78.3763 327.923 81.7312H310.45C310.916 76.6989 312.593 72.319 315.482 68.5914C318.464 64.8638 322.285 62.0215 326.944 60.0645C331.604 58.0143 336.822 56.9892 342.6 56.9892C352.478 56.9892 360.26 59.4588 365.944 64.3978C371.629 69.3369 374.471 76.3262 374.471 85.3656V128H359.235L357.557 116.817C355.507 120.545 352.618 123.62 348.89 126.043C345.256 128.466 340.55 129.677 334.772 129.677ZM338.826 115.699C343.951 115.699 347.912 114.022 350.708 110.667C353.597 107.312 355.414 103.165 356.159 98.2258H340.923C336.17 98.2258 332.769 99.1111 330.718 100.882C328.668 102.559 327.643 104.656 327.643 107.172C327.643 109.875 328.668 111.971 330.718 113.462C332.769 114.953 335.471 115.699 338.826 115.699ZM425.234 129.677C418.245 129.677 412.047 128.186 406.642 125.204C401.237 122.222 396.997 118.029 393.922 112.624C390.847 107.219 389.309 100.975 389.309 93.8925C389.309 86.7168 390.8 80.3333 393.782 74.7419C396.857 69.1505 401.051 64.8172 406.363 61.7419C411.768 58.5735 418.105 56.9892 425.374 56.9892C432.176 56.9892 438.187 58.4803 443.406 61.4624C448.624 64.4444 452.678 68.5448 455.567 73.7634C458.549 78.8889 460.04 84.6201 460.04 90.957C460.04 91.9821 459.994 93.0538 459.9 94.172C459.9 95.2903 459.854 96.4552 459.761 97.6667H407.062C407.434 103.072 409.298 107.312 412.653 110.387C416.101 113.462 420.248 115 425.094 115C428.728 115 431.757 114.208 434.18 112.624C436.696 110.946 438.56 108.803 439.771 106.194H457.943C456.639 110.573 454.449 114.581 451.374 118.215C448.391 121.756 444.664 124.552 440.191 126.602C435.811 128.652 430.825 129.677 425.234 129.677ZM425.374 71.5269C420.994 71.5269 417.126 72.7849 413.771 75.3011C410.417 77.724 408.273 81.4516 407.341 86.4839H441.868C441.589 81.9176 439.911 78.2831 436.836 75.5806C433.761 72.8781 429.94 71.5269 425.374 71.5269ZM507.139 95.0107V80.0538H533.419V55.871H548.655V80.0538H574.795V95.0107H548.655V119.194H533.419V95.0107H507.139Z" fill="#B8CEF7" />
                    <path d="M78.409 156.043C57.7592 156.043 37.9552 147.84 23.3536 133.238C8.75193 118.637 0.548828 98.8325 0.548828 78.1827C0.548829 57.5329 8.75194 37.7289 23.3536 23.1272C37.9552 8.52562 57.7592 0.32251 78.409 0.32251V78.1827V156.043Z" fill="#002993" />
                    <line x1="77.4706" y1="8.84937" x2="77.4706" y2="21.6563" stroke="#9E9FA6" stroke-width="0.640348" />
                    <line x1="77.4706" y1="132.979" x2="77.4706" y2="145.785" stroke="#9E9FA6" stroke-width="0.640348" />
                    <line x1="7.67773" y1="75.7658" x2="20.4847" y2="75.7658" stroke="#9E9FA6" stroke-width="0.640348" />
                    <line x1="81.5186" y1="76.2689" x2="49.8771" y2="121.695" stroke="#F80707" stroke-width="0.640348" />
                    <circle cx="83.9441" cy="77.1476" r="6.36065" transform="rotate(2.59167 83.9441 77.1476)" fill="#F80707" stroke="white" stroke-width="2.12022" />
                </svg>
                <p>Une plateforme de gestion des heures supplémentaires d’enseignement.</p>
                </div>
                
            </div>
            <div className="login-page-container">
                <form className="login-form" onSubmit={handleSubmit} >
                    <p className='bienvenue'> Bienvenue!</p>
                    <div className='email-input'>
                        <label className="input-label" > Votre E-mail</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="e-mail"
                            required
                            onChange={(e) => setUser({ ...user, Email: e.target.value })}
                        />
                    </div>
                    <div className='password-input'>
                        <label className='input-label'>Votre mot de passe</label>

                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input-field"
                                placeholder="mot de passe"
                                required
                                onChange={(e) => setUser({ ...user, MotDePasse: e.target.value })}
                            />
                            <span
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ?
                                    <img src={eyeFigma} alt="Hide password" /> :
                                    <img src={eyeFigma} alt="Show password" />
                                }
                            </span>
                        </div>
                    </div>
                    <div className="forgot-password-link">
                        <a href="#" onClick={() => setUserType('admin')}>Etes-vous un admin?</a>
                    </div>
                    <button type="submit" className="submit-button">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;