import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate
import ResetPasswordImage from '../assets/ResetPasswordImage.svg';
import axios from 'axios';
import validateUser from '../ValidateUser';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState(''); // Declare email state but don't initialize

  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  useEffect(() => {
    // Retrieve the email from localStorage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail); 
    } else {
      // Handle case where email is not found
      setErrorMessage('Aucune adresse e-mail trouvée ');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateUser({ email, password: newPassword }); 
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors.email || errors.password); 
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/reset-password', {
        email, 
        otp,
        newPassword,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setErrorMessage('');
        navigate('/login'); // Redirection vers la page de connexion après succès
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
      setMessage('');
    }
  };

  return (
    <section className="ezy__reset-password light flex items-center justify-center py-14 md:py-24 bg-gray-600 dark:bg-[#0b1727] text-black text-opacity-90 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-gray-700 dark:bg-slate-800 shadow-xl p-6 lg:p-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 lg:order-2">
                  <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                    <img src={ResetPasswordImage} alt="Reset Password" />
                    <div className="text-center mt-12">
                      <Link to="/login" className="underline hover:text-green-500 duration-300 text-white">
                        Vous vous souvenez de votre mot de passe ? Se connecter
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                    <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Réinitialiser le mot de passe</h2>
                    {message && <p className="text-green-500 bg-green-100 p-4 mb-4 rounded-lg">{message}</p>}
                    {errorMessage && <p className="text-white bg-red-600 p-4 mb-4 rounded-lg">{errorMessage}</p>} {/* Erreurs en blanc sur fond rouge */}

                    <form className="mt-6" onSubmit={handleSubmit}>
                      <div className="w-full relative mb-6">
                        <input
                          type="text"
                          className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2" // Changez le texte en blanc
                          id="otp"
                          placeholder="OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                        <i className="fas fa-key absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                      </div>
                      <div className="w-full relative mb-6">
                        <input
                          type="password"
                          className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2" // Changez le texte en blanc
                          id="newPassword"
                          placeholder="Nouveau mot de passe"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <i className="fas fa-lock absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                      </div>
                      <div className="w-full relative mb-6">
                        <input
                          type="password"
                          className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2" // Changez le texte en blanc
                          id="confirmPassword"
                          placeholder="Confirmer le mot de passe"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <i className="fas fa-lock absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                      </div>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4"
                      >
                        Réinitialiser le mot de passe <i className="fas fa-arrow-right"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
