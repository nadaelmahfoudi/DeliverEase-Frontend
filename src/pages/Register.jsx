import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Signup from '../assets/Signup.svg';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas !');
      setSuccessMessage(''); // Réinitialiser le message de succès
      return;
    }

    const dataToSend = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/register', dataToSend);

      console.log('Inscription réussie:', response.data);
      localStorage.setItem('userEmail', formData.email);

      // Stocker le token 
      const token = response.data.token; // Assurez-vous que le backend renvoie un token
      if (token) {
        localStorage.setItem('token', token); 
        localStorage.setItem('isVerified', 'true'); 
      }

      setSuccessMessage('Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte.');
      setErrorMessage(''); 

    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Inscription échouée';
        setErrorMessage(errorMessage);
        setSuccessMessage(''); // Réinitialiser le message de succès
      } else if (error.request) {
        console.error('Pas de réponse du serveur:', error.request);
        setErrorMessage('Pas de réponse du serveur');
        setSuccessMessage(''); // Réinitialiser le message de succès
      } else {
        console.error('Erreur lors de l\'inscription:', error.message);
        setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
        setSuccessMessage(''); // Réinitialiser le message de succès
      }
    }
  };

  return (
    <div>
      <Navbar />
      <section className="ezy__signup15 light flex items-center justify-center py-14 md:py-24 bg-gray-600 dark:bg-[#0b1727] text-black text-opacity-90 dark:text-white">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center">
            <div className="w-full md:w-2/3">
              <div className="bg-gray-700 dark:bg-slate-800 shadow-xl p-6 lg:p-12">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="w-full lg:w-1/2 lg:order-2">
                    <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                      <img src={Signup} alt="" />
                      <div className="text-center mt-12">
                        <Link to="/login" className="underline hover:text-green-500 duration-300 text-white">I am already a member</Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                    <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                      <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Sign Up</h2>

                      {/* Afficher le message de succès */}
                      {successMessage && <p className="text-green-500 bg-green-100 p-4 mt-4 rounded-lg">{successMessage}</p>}
                      
                      {/* Afficher le message d'erreur */}
                      {errorMessage && <p className="text-red-500 bg-red-100 p-4 mb-4 rounded-lg">{errorMessage}</p>}

                      <form onSubmit={handleSubmit} className="mt-6">
                        <div className="w-full relative mb-6">
                          <input
                            type="text"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2" // Texte en blanc
                            id="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="email"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2" // Texte en blanc
                            id="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="password"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2" // Texte en blanc
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="password"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2" // Texte en blanc
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4"
                        >
                          Register <i className="fas fa-arrow-right"></i>
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
      <Footer />
    </div>
  );
}

export default Register;
