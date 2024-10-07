import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Signin from '../assets/Signin.svg';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifiedMessage, setVerifiedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Affichage d'un message si l'e-mail a été vérifié
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const verified = queryParams.get('verified');
    const email = queryParams.get('email');

    if (verified === 'true') {
      setVerifiedMessage(`Votre e-mail a été vérifié avec succès. Vous pouvez maintenant vous connecter avec ${email}.`);
    }
  }, [location]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.pass.value;

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Connexion réussie:', data);
        // Redirection vers la page de vérification de l'OTP
        navigate(`/verify-otp`);
      } else {
        setErrorMessage(data.message); // Affichage du message d'erreur en cas d'échec
        console.error('Erreur de connexion:', data.message);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
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
                      <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Connexion</h2>

                      {verifiedMessage && (
                        <p className="text-green-500 bg-green-100 p-4 mb-4 rounded-lg">
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
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2"
                            id="email"
                            placeholder="Adresse e-mail"
                          />
                          <i className="fas fa-envelope absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="password"
                            name="pass"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2"
                            id="pass"
                            placeholder="Mot de passe"
                          />
                          <i className="fas fa-lock absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
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
