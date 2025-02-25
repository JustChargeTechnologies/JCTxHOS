import React from 'react';
import { motion } from 'framer-motion';
import bg from '../assets/bg.png';

const ThankYouScreen = ({ hasPlayed }) => {
    return (
        <div className="h-screen w-full text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background with blur */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg"
                style={{ backgroundImage: `url(${bg})` }}
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/90" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-4"
            >
                {/* Emoji Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3
                    }}
                    className="text-6xl mb-6"
                >
                    🎉
                </motion.div>

                {/* Thank You Text */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-bold mb-6"
                >
                    Thank You!
                </motion.h1>

                {/* Sinner Text with Glow Effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-3xl font-serif mb-8"
                >
                    <span className="animate-pulse text-red-500 font-semibold tracking-wider">
                        You Are a Sinner Now!
                    </span>
                </motion.div>

                {/* Message for users who have already played */}
                {hasPlayed && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-lg text-gray-400 mt-4"
                    >
                        You have already claimed your coupon.
                        <br />
                        Check your email for details.
                    </motion.p>
                )}
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1 }}
                    className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-500 rounded-full blur-xl"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-xl"
                />
            </div>
        </div>
    );
};

export default ThankYouScreen;