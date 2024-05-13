import React, { useState } from 'react';
import '../Styles/LoginPage.css';
import eyeFigma from '../Assets/eye.svg';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='bckg'>
            <div className="login-page-container">
                <form className="login-form">
                    <p className='bienvenue'> Bienvenue!</p>
                    <div className='email-input'>
                        <label className="input-label" > Votre E-mail</label>
                        <input type="email" className="input-field" placeholder="e-mail" required />
                    </div>
                    <div className='password-input'>
                        <label className='input-label'>Votre mot de passe</label>

                        <div className="password-input-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="input-field" 
                                placeholder="mot de passe" 
                                required 
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
                        <a href="#">Mot de passe oublié?</a>
                    </div>
                    <button type="submit" className="submit-button">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;