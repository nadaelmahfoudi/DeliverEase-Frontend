import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VerifyOtpImage from '../assets/VerifyOtpImage.svg';
import axios from 'axios';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (!storedEmail) {
      alert('Veuillez vous connecter à nouveau.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
  
    if (!email || !otp) {
      alert('Email ou OTP manquant.');
      return;
    }
  
    try {
  
      const response = await axios.post('http://localhost:5000/api/v1/users/verify-otp', { email, otp }, {
        headers: {
          'Content-Type': 'application/json', // Assurez-vous que ce header est défini
        },
      });
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        alert(response.data.message || 'Une erreur s’est produite, veuillez réessayer.');
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'OTP :", error);
      alert('Erreur lors de la vérification, veuillez réessayer.');
    }
  };
  

  return (
    <section className="ezy__verify-otp flex items-center justify-center py-14 md:py-24 bg-gray-600 dark:bg-[#0b1727] text-black dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-gray-700 dark:bg-slate-800 shadow-xl p-6 lg:p-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 lg:order-2">
                  <img src={VerifyOtpImage} alt="Verify OTP" className="mt-12 lg:mt-0"/>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Verify OTP</h2>
                  <p className="text-white mb-6">Please enter the OTP sent to your email.</p>
                  <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="relative mb-6">
                      <input
                        type="text"
                        className="bg-transparent border-b focus:outline-none text-sm w-full py-2 text-white"
                        id="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white mt-4"
                    >
                      Verify OTP
                    </button>
                  </form>
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
