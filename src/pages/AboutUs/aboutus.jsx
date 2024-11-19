import React from 'react'
import { motion } from "framer-motion";
import Banner from '../../components/Banner/Banner'
import IMAGES from '../../assets/assests';
import SubjectCard from '../../components/SubjectCard/SubjectCard'
import { SlideUp } from '../../utilities/animation';

const BannerData = {
    image: IMAGES?.banner1,
    tag: "WHAT WE DO",
    title: "Effortlessly Track Your Expenses and Manage Your Budget",
    subtitle:
        "We provide a seamless platform for tracking your daily expenses, setting personalized budgets, and gaining insights into your spending habits. Stay on top of your financial goals with real-time updates and an intuitive dashboard. Our goal is to make managing your finances simple and efficient.",
    link: "#",
};

const BannerData2 = {
    image: IMAGES?.banner2,
    tag: "OUR STORY",
    title: "How We Help You Manage Your Money Effectively",
    subtitle:
        "Our journey began with a simple idea – to make personal finance management easier and more accessible for everyone. We combined real-time expense tracking, intuitive budgeting tools, and insightful analytics to empower users in taking control of their financial future. Our mission is to help you track, understand, and grow your finances in a way that fits your life.",
    link: "#",
};

const AboutUs = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div className="py-16">
                    {/* Our Mission Section */}
                    <div className="text-center max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl sm:text-4xl font-bold  mb-4">
                            Our Mission
                        </h2>
                        <motion.p
                            variants={SlideUp(0.5)}
                            initial="hidden"
                            whileInView={"visible"}
                            className="text-lg sm:text-xl leading-relaxed"
                        >
                            Our mission is to provide an intuitive and user-friendly platform that empowers individuals to take control of their financial journey. We aim to simplify the process of tracking expenses, setting budgets, and making informed decisions. Our goal is to help users develop healthier financial habits, manage their money with confidence, and achieve their long-term financial goals.
                        </motion.p>
                    </div>
                </div>

            </motion.div>
            <Banner {...BannerData2} reverse={true} />
            <Banner {...BannerData} />
            <SubjectCard />
        </>
    )
}

export default AboutUs