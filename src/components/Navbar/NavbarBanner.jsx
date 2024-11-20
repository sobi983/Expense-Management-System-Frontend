import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NavbarBanner = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-primary text-sm text-center font-semibold p-1 hidden lg:block relative"
      >
        Are you looking for a smart way to manage and track your personal or household expenses?
        <Link to={'/contact'}>
          <button className="text-secondary ml-2">Talk to us</button>
        </Link>
        <div
          className="absolute top-1/2 right-10 cursor-pointer -translate-y-1/2"
          onClick={() => setIsOpen(false)}
        >
          X
        </div>
      </motion.div>
    )
  );
};

export default NavbarBanner;
