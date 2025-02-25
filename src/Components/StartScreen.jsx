import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/bg.png'; // Replace with your background image path
import buttonImage from '../assets/start.png'; // Replace with your button image path
import bg from "../assets/Group 1.svg";

const StartScreen = ({ onStartGame }) => {
    return (
        <div
            className="h-screen w-full flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >


            <div className="absolute top-0 left-0 p-4">
                <img src={bg} alt="logo" className="w-30 h-30" />
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                {/* <h1 className="text-4xl font-bold mb-8 text-white">HOUSE OF SINNERS</h1> */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onStartGame}
                    className="w-60 h-60 bg-cover bg-center rounded-full relative overflow-hidden flex -mt-20 ml-8"
                    style={{
                        backgroundImage: `url(${buttonImage})`,
                        boxShadow: '0 0 10px #2CB1D8',
                    }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            boxShadow: [
                                '0 0 10px #2CB1D8',
                                '0 0 20px #2CB1D8',
                                '0 0 40px #2CB1D8',
                                '0 0 20px #2CB1D8',
                                '0 0 10px #2CB1D8',
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <span className="relative z-10 text-white text-xl font-bold">

                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default StartScreen;
