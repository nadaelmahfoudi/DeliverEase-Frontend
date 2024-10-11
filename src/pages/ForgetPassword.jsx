import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate
import axios from 'axios';
import ForgetPasswordImage from '../assets/ForgetPasswordImage.svg';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Utilisez le hook useNavigate ici

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/forget-password', {
        email,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setErrorMessage('');
        navigate('/reset-password'); // Utilisez navigate pour rediriger
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
    <section className="ezy__forget-password light flex items-center justify-center py-14 md:py-24 bg-gray-600 dark:bg-[#0b1727] text-black text-opacity-90 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-gray-700 dark:bg-slate-800 shadow-xl p-6 lg:p-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 lg:order-2">
                  <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                    <img src={ForgetPasswordImage} alt="Forget Password" />
                    <div className="text-center mt-12">
                      <Link to="/login" className="underline hover:text-green-500 duration-300 text-white">
                        Remembered your password? Sign In
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                    <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Mot de passe oublié</h2>
                    <p className="text-white mb-6">
                      Veuillez entrer votre adresse e-mail. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
                    </p>

                    {message && <p className="text-green-500 bg-green-100 p-4 mb-4 rounded-lg">{message}</p>}
                    {errorMessage && <p className="text-red-500 bg-red-100 p-4 mb-4 rounded-lg">{errorMessage}</p>}

                    <form className="mt-6" onSubmit={handleSubmit}>
                      <div className="w-full relative mb-6">
                        <input
                          type="email"
                          className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2 text-white"
                          id="email"
                          placeholder="Adresse e-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <i className="fas fa-envelope absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                      </div>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4"
                      >
                        Envoyer le code de réinitialisation <i className="fas fa-arrow-right"></i>
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

export default ForgetPassword;
