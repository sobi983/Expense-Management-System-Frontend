import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const ResponsiveMenu = ({ isOpen }) => {
  const { userData, removeUserData } = useUserStore()
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    removeUserData();
    navigate('/login');
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden"
        >
          <div className="text-xl font-semibold uppercase bg-primary text-black py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>
                <a href="/" className="hover:text-secondary duration-200">
                  Home
                </a>
              </li>
              <li>
                <Link to={'/about'}>
                  <button type="button" className=' hover:text-secondary'>About Us</button>
                </Link>
              </li>
              <li>
                <Link to={'/contact'}>
                  <button type="button" className=' hover:text-secondary'>Contact Us</button>
                </Link>
              </li>
              <li>
                <Link to={Object.keys(userData).length != 0 ? '/expense' : '/login'}>
                  <button className="text-white bg-secondary font-semibold rounded-full px-6 py-2">{Object.keys(userData).length != 0 ? 'Dashboard' : 'Sign in'}</button>
                </Link>
              </li>
              <li>
                {Object.keys(userData).length != 0 && <div className="">
                  <button className="text-white bg-secondary font-semibold rounded-full px-6 py-2" onClick={() => signOut()}>{Object.keys(userData).length != 0 ? 'Signout' : ''}</button>
                </div>}
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
