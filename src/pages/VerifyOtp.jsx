import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerifyOtpImage from '../assets/VerifyOtpImage.svg'; // Assure-toi d'avoir une image pour le OTP
import axios from 'axios'; // Assure-toi d'avoir installé Axios

const VerifyOtp = () => {
  const [email, setEmail] = useState(''); // État pour l'email
  const [otp, setOtp] = useState(''); // État pour l'OTP
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de l'email et de l'OTP à l'API
      const response = await axios.post('http://localhost:5000/api/v1/users/verify-otp', { email, otp });

      if (response.data.token) {
        // Redirige vers le Dashboard si l'OTP est correct
        navigate('/dashboard');
      } else {
        alert(response.data.message || 'Une erreur s’est produite, veuillez réessayer.'); // Affiche le message d'erreur
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'OTP :", error);
      alert('Erreur lors de la vérification, veuillez réessayer.'); // Gérer l'erreur selon tes besoins
    }
  };

  return (
    <section className="ezy__verify-otp light flex items-center justify-center py-14 md:py-24 bg-gray-600 dark:bg-[#0b1727] text-black text-opacity-90 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-gray-700 dark:bg-slate-800 shadow-xl p-6 lg:p-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 lg:order-2">
                  <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                    <img src={VerifyOtpImage} alt="Verify OTP" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                    <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Verify OTP</h2>
                    <p className="text-white mb-6">
                      Please enter your email and the OTP sent to your email.
                    </p>
                    <form className="mt-6" onSubmit={handleSubmit}>
                      <div className="w-full relative mb-6">
                        <input
                          type="email"
                          className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2"
                          id="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="w-full relative mb-6">
                        <input
                          type="text"
                          className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2"
                          id="otp"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                        <i className="fas fa-key absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                      </div>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4"
                      >
                        Verify OTP <i className="fas fa-arrow-right"></i>
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

export default VerifyOtp;
