import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bg from '../assets/bg.png';

const FormScreen = ({ gameData, onSubmit }) => {
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required.";
        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Enter a valid email.";
        }
        if (!formData.mobile) {
            tempErrors.mobile = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            tempErrors.mobile = "Mobile number must be 10 digits.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await onSubmit(formData);
            setFormData({ name: "", email: "", mobile: "" });
            setErrors({});
        } catch (error) {
            console.error("Error in form submission:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black/70" />

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
                    {/* Name Field */}
                    <div className="relative group">
                        <label className="text-white text-sm">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your name"
                            className="w-full bg-white/10 border border-blue-300/20 rounded-full px-6 py-3 text-white placeholder-gray-400 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-transparent
                            transition-all duration-300"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                        <label className="text-white text-sm">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full bg-white/10 border border-blue-300/20 rounded-full px-6 py-3 text-white placeholder-gray-400 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-transparent
                            transition-all duration-300"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Mobile Field */}
                    <div className="relative group">
                        <label className="text-white text-sm">
                            Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            placeholder="Enter your 10-digit mobile number"
                            className="w-full bg-white/10 border border-blue-300/20 rounded-full px-6 py-3 text-white placeholder-gray-400 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-transparent
                            transition-all duration-300"
                            maxLength={10}

                        />
                        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-32 mx-auto mt-8 block px-8 py-2 bg-white/20 text-white rounded-full
                        backdrop-blur-sm border border-blue-300/20 hover:bg-white/30 
                        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "SEND"}
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
};

export default FormScreen;
