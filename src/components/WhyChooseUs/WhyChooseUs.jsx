import React from "react";
import { GrMoney } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa6";
import { GiPieChart } from "react-icons/gi";
import { GiWallet } from "react-icons/gi";
import { motion } from "framer-motion";
import { SlideLeft } from "../../utilities/animation";

const WhyChooseData = [
  {
    id: 1,
    title: "Personalized Expense Tracking",
    desc: "Easily customize categories and budgets to suit your unique financial goals.",
    icon: <GrMoney />, // Replace with an appropriate expense tracker-related icon
    bgColor: "#0063ff",
    delay: 0.3,
  },
  {
    id: 2,
    title: "Real-Time Updates",
    desc: "Track your expenses instantly and stay updated with real-time data.",
    link: "/",
    icon: <FaChartLine />, // Replace with an appropriate financial icon
    bgColor: "#73bc00",
    delay: 0.6,
  },
  {
    id: 3,
    title: "Intuitive Dashboard",
    desc: "Visualize your spending with easy-to-understand graphs and insights.",
    link: "/",
    icon: <GiPieChart />, // Replace with an appropriate data visualization icon
    bgColor: "#fa6400",
    delay: 0.9,
  },
  {
    id: 4,
    title: "Secure and Free",
    desc: "Enjoy a secure, private, and free expense tracking experience.",
    link: "/",
    icon: <GiWallet />, // Replace with an appropriate wallet or secure-related icon
    bgColor: "#fe6baa",
    delay: 0.9,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-[#f9fafc]">
      <div className="container py-24">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-orange-600">
            Why Choose Us
          </h1>
          <p className="font-semibold text-3xl">
            Why Choose Our Expense Tracking Solution
          </p>
        </div>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {WhyChooseData.map((item, index) => {
            return (
              <motion.div
                key={index}
                variants={SlideLeft(item.delay)}
                initial="hidden"
                whileInView={"visible"}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]"
              >
                {/* icon section */}
                <div
                  style={{ backgroundColor: item.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center text-white"
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
