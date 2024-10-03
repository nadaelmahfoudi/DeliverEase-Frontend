import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Signin from '../assets/Signin.svg'

function Login() {
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
                      <img src={Signin} alt="" />
                      <div className="text-center mt-12">
                        <Link to="/register" className="underline hover:text-green-500 duration-300 text-white">I am not a member yet</Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                    <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                      <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">Sign In </h2>
                      <form className="mt-6">
                        <div className="w-full relative mb-6">
                          <input
                            type="email"
                            className="bg-transparent border-b  dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2"
                            id="email"
                            placeholder="Email Address"
                          />
                          <i className="fas fa-envelope absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="password" // Corrected input type
                            className="bg-transparent border-b  dark:border-gray-200 focus:outline-none focus:border-green-500 text-sm w-full py-2"
                            id="pass"
                            placeholder="Password"
                          />
                          <i className="fas fa-lock absolute top-1/2 -translate-y-1/2 right-2 opacity-80"></i>
                        </div>
                        <div className="mb-4">
                          <Link to="/forgot-password" className="underline hover:text-green-500 duration-300 text-slate-400">
                            Forget Password?
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4"
                        >
                          Login <i className="fas fa-arrow-right"></i>
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
  )
}

export default Login
