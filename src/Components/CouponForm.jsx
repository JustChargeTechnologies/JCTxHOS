import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bg from '../assets/bg.png';



const MysticalForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, contact });
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
                style={{
                    backgroundImage: `url(${bg})`
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black/70" />

            {/* Animated stars/particles effect */}
            {/* <div className="absolute inset-0 opacity-50"
                style={{
                    background: 'radial-gradient(white, rgba(255,255,255,.2)) 50% 50% / 5px 5px, radial-gradient(white, rgba(255,255,255,.15)) 30% 30% / 5px 5px',
                    backgroundSize: '100px 100px',
                }}
            /> */}

            {/* Main content */}
            <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-serif text-white mb-12 tracking-widest"
                >
                    HOUSE OF SINNERS
                </motion.div>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    onSubmit={handleSubmit}
                    className="w-full max-w-md space-y-6"
                >
                    <div className="relative group">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full bg-white/10 border border-blue-300/20 rounded-full px-6 py-3 text-white placeholder-gray-400 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-transparent
                            transition-all duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-blue-400/5 group-hover:bg-blue-400/10 transition-all duration-300 -z-10" />
                    </div>

                    <div className="relative group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Id"
                            className="w-full bg-white/10 border border-blue-300/20 rounded-full px-6 py-3 text-white placeholder-gray-400 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-transparent
                            transition-all duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-blue-400/5 group-hover:bg-blue-400/10 transition-all duration-300 -z-10" />
                    </div>

                    <div className="relative group">
                        <input
                            type="tel"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Contact Number"
                            className="w-full bg-white/10 border border-blue-300/20 rounded-full px-6 py-3 text-white placeholder-gray-400 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-transparent
                            transition-all duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-blue-400/5 group-hover:bg-blue-400/10 transition-all duration-300 -z-10" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-32 mx-auto mt-8 block px-8 py-2 bg-white/20 text-white rounded-full
                        backdrop-blur-sm border border-blue-300/20 hover:bg-white/30 
                        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                    >
                        SEND
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
};

export default MysticalForm;
