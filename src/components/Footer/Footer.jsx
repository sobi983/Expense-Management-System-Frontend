import React from "react";
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import IMAGES from "../../assets/assests";

const FooterBg = {
  backgroundImage: `url(${IMAGES?.footer})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "bottom center",
};

const Footer = () => {

  return (
    <div style={FooterBg} className="rounded-t-3xl">
      <div className="bg-primary/5">
        <div className="container">
          <div className="grid md:grid-cols-4 md:gap-4 py-5 border-t-2 border-gray-300/10 text-black">
            {/* brand info section */}
            <div className="py-8 px-4 space-y-4">
              <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                <Link to="/">
                  <img src={IMAGES.saff} alt="Error" className='w-10' />
                </Link>
                <p className="">Expense Tracker</p>
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
                accusamus nulla labore cumque id ipsum molestias architecto
                voluptatum saepe ab.
              </p>
              <div className="flex items-center justify-start gap-5 !mt-6">
                <a href="https://maps.app.goo.gl/igFTNDSw9d2whfq2A" target="_blank">
                  <HiLocationMarker className="text-3xl cursor-pointer hover:text-secondary duration-200" target="_blank" />
                </a>
                <a href="https://www.instagram.com/saudiff/?hl=en" target="_blank">
                  <FaInstagram className="text-3xl cursor-pointer hover:text-secondary duration-200" />
                </a>
                <a href="https://www.facebook.com/saudiFF1956/" target="_blank">
                  <FaFacebook className="text-3xl cursor-pointer hover:text-secondary duration-200" />
                </a>
                <a href="https://www.linkedin.com/company/saudi-arabian-football-federation/" target="_blank">
                  <FaLinkedin className="text-3xl cursor-pointer hover:text-secondary duration-200" />
                </a>
              </div>
            </div>
            {/* Footer Links  */}
            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
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
                </ul>
              </div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Resources
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
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
                </ul>
              </div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Company Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
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
                </ul>
              </div>
            </div>
          </div>
          {/* copyright section  */}
          <div className="mt-8">
            <div className="text-center py-6 border-t-2 border-gray-800/10">
              <span className="text-sm text-black/60">
                {" "}
                @copyright 2024 Saudi Arabian Football Federation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
