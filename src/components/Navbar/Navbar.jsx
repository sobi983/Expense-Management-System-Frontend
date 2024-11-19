import React from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import IMAGES from "../../assets/assests.js";
import { NavbarMenu } from "../../mockData/data.js";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import useUserStore from "../../store/userStore.js";

let styles = {
  // color: "rgb(66 32 6)",
  // textDecoration: "underline",
  fontWeight: "bold"
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { userData, removeUserData } = useUserStore()
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    removeUserData();
    navigate('/login');
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="container flex justify-between items-center py-6">
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <Link to="/">
              <img src={IMAGES.saff} alt="Error" className='w-20' />
            </Link>
            <p>Expense Tracker</p>
          </div>

          {/* Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink to={item?.link} style={({ isActive }) => isActive ? styles : null}>{item.title}</NavLink>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* CTA Button section */}
          <div className="flex gap-3">
            <div className="hidden lg:block space-x-6">
              <Link to={Object.keys(userData).length != 0 ? '/expense' : '/login'}>
                <button className="text-white bg-secondary font-semibold rounded-full px-6 py-2">{Object.keys(userData).length != 0 ? 'Dashboard' : 'Sign in'}</button>
              </Link>
            </div>
            {Object.keys(userData).length != 0 && <div className="hidden lg:block space-x-6">
              <button className="text-black bg-primary font-semibold rounded-full px-6 py-2" onClick={()=>signOut()}>{Object.keys(userData).length != 0 ? 'Signout' : ''}</button>
            </div>}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </motion.div>

      {/* mobile Sidebar section */}
      <ResponsiveMenu isOpen={isOpen} />
    </>
  );
};

export default Navbar;
