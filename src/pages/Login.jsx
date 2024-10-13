import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importation d'Axios
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Signin from '../assets/Signin.svg';
import validateUser from '../ValidateUser';

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedMessage, setVerifiedMessage] = useState('');

// Gestion de la soumission du formulaire
const handleSubmit = async (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.pass.value;

  const errors = validateUser({ email, password });

  if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join(', '));
      return; 
  }

  try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', {
          email,
          password,
      });

      if (response.status === 200) {
          const user = response.data.user;
          const token = response.data.token;

          // Vérifiez que l'utilisateur existe avant d'accéder à ses propriétés
          if (user) {
              localStorage.setItem('email', user.email);
              localStorage.setItem('token', token);

              if (user.isFirstLogin) {
                  navigate('/dashboard'); // Redirige vers la page de vérification OTP
              } else {
                  navigate('/verify-otp'); // Redirige vers le tableau de bord
              }
          }
      }
  } catch (error) {
      if (error.response) {
          setErrorMessage(error.response.data.message);
          console.error('Erreur de connexion:', error.response.data.message);
      } else {
          setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
          console.error('Erreur de connexion:', error.message);
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
                      <img src={Signin} alt="Sign in illustration" />
                      <div className="text-center mt-12">
                        <Link to="/register" className="underline hover:text-green-500 duration-300 text-white">
                          Je ne suis pas encore membre
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                    <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                      <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Login</h2>

                      {verifiedMessage && (
                        <p className="text-red-500 bg-red-100 p-4 mb-4 rounded-lg ">
                          {verifiedMessage}
                        </p>
                      )}

                      {errorMessage && (
                        <p className="text-red-500 bg-red-100 p-4 mb-4 rounded-lg">
                          {errorMessage}
                        </p>
                      )}

                      <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="w-full relative mb-6">
                          <input
                            type="email"
                            name="email"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2 text-white"
                            id="email"
                            placeholder="Adresse e-mail"
                          />
                          <i className="fas fa-envelope absolute top-1/2 -translate-y-1/2 right-2 opacity-80 text-white"></i>
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="password"
                            name="pass"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2 text-white"
                            id="pass"
                            placeholder="Mot de passe"
                          />
                          <i className="fas fa-lock absolute top-1/2 -translate-y-1/2 right-2 opacity-80 text-white"></i>
                        </div>
                        <div className="mb-4">
                          <Link to="/forgot-password" className="underline hover:text-green-500 duration-300 text-slate-400">
                            Mot de passe oublié ?
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4"
                        >
                          Connexion <i className="fas fa-arrow-right"></i>
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

export default Login;
