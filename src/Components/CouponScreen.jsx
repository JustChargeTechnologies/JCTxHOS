import React from 'react';
import { motion } from 'framer-motion';
import bg from '../assets/bg.png';
import couponimage1 from '../assets/coupon1.png';
import couponimage2 from '../assets/coupon2.png';
import claim from "../assets/claim.png";

const CouponScreen = ({ couponPercentage, onContinue }) => {
    const getCouponDetails = (percentage) => {
        switch (percentage) {
            case 80:
                return {
                    name: "IDIOMMASTER",
                    expiry: "30 April 2025",
                    style: "bg-gradient-to-r from-purple-600 to-indigo-600",
                    image: couponimage2
                };
            case 50:
                return {
                    name: "IDIOMHALF",
                    expiry: "1 May 2025",
                    style: "bg-gradient-to-r from-blue-500 to-teal-500",
                    image: couponimage2
                };
            default:
                return {
                    name: "IDIOMRUSH",
                    expiry: "1 May 2025",
                    style: "bg-gradient-to-r from-blue-400 to-purple-500",
                    image: couponimage2
                };
        }
    };

    const { name, expiry, style, image } = getCouponDetails(couponPercentage);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-sm" />

            {/* Content */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[320px] sm:max-w-[400px] mx-auto"
                >
                    {/* Title */}
                    <motion.h2
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="text-3xl font-bold text-white text-center mb-6"
                    >
                        🎉 Your Coupon 🎉
                    </motion.h2>

                    {/* Coupon */}
                    <div className="relative rounded-xl overflow-hidden shadow-xl mx-auto">
                        <img src={image} alt="Coupon" className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {/* Discount */}
                            <motion.div className="absolute top-[15%] text-center" whileHover={{ scale: 1.05 }}>
                                <div className="text-5xl font-bold text-yellow-500 drop-shadow-lg">{couponPercentage}% OFF</div>
                            </motion.div>

                            {/* Coupon Code & Name in One Line */}
                            <div className='flex justify-center items-center text-black text-xl -mt-2'

                            >Coupon Code :
                                <span className="text-lg font-bold text-red-600 tracking-wide">{name}</span>
                            </div>

                            {/* Expiry Date */}
                            <motion.div className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2">
                                <div className="text-sm text-black font-medium">Valid until {expiry}</div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Claim Button */}
                    <motion.div
                        onClick={onContinue}
                        className="mt-0 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={claim} alt="Claim Coupon" className="w-full max-w-[220px] mx-auto hover:brightness-110 transition-all duration-300" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CouponScreen;
