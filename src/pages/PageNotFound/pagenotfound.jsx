import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <main className="min-h-screen flex justify-center items-center">
                    <div className=" flex flex-col items-center pb-32">
                        <h1 className="font-bold text-4xl p-7 sm:p-0  sm:w-10/12">Sorry, the page you were looking for was not found.</h1>
                        <button className="bg-black text-white rounded px-16 py-5  sm:mt-10 font-bold"><Link to='..'>Return to home</Link></button>
                    </div>
                </main>
            </motion.div>
        </>
    )
}

export default PageNotFound
