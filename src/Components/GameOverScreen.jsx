import React from 'react'
import { motion } from 'framer-motion'
import bg from '../assets/bg.png';
import claimcoupon from '../assets/claimcoupon.png'

const GameOverScreen = ({ score, couponPercentage, onShowCoupon }) => {
    return (
        <div className="h-screen w-full text-white flex flex-col items-center justify-center relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
                style={{
                    backgroundImage: `url(${bg})`,
                }}
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black/70" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10"
            >
                <h2 className="text-4xl font-bold mb-6 font-poppins">GAME OVER</h2>
                <p className="text-2xl mb-4 font-poppins">Your Score: {score} / 2</p>
                <p className="text-xl mb-8 font-poppins">You've earned a {couponPercentage}% off coupon!</p>


                <motion.button

                    onClick={onShowCoupon}

                >
                    <img src={claimcoupon} alt="Clickable" />
                </motion.button>
            </motion.div>
        </div>
    )
}

export default GameOverScreen




const CouponScreen = ({ couponPercentage, onRestart }) => {
    const getCouponDetails = (percentage) => {
        switch (percentage) {
            case 80:
                return { name: "IDIOMMASTER", expiry: "31 Jan 2025", image: couponimage1 };
            case 50:
                return { name: "IDIOMHALF", expiry: "15 Jan 2025", image: couponimage2 };
            case 10:
                return { name: "IDIOMTRY", expiry: "1 Jan 2025", image: couponimage1 };
            default:
                return { name: "IDIOMRUSH", expiry: "15 Jan 2025", image: couponimage2 };
        }
    };

    const { name, expiry, image } = getCouponDetails(couponPercentage);

    return (
        <div className="h-screen w-full text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background with blur */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg"
                style={{ backgroundImage: `url(${bg})` }}
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/90" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10"
            >
                <h2 className="text-4xl font-bold mb-6">🎉 Your Coupon 🎉</h2>

                <div>
                    {/* Coupon image */}
                    <img src={image} alt="Coupon" className="w-full h-full object-cover" />

                    <div className="p-6">
                        <p className="text-5xl font-bold text-yellow-600 -mt-[29rem]">{couponPercentage}% OFF</p>
                        <p className="text-lg font-semibold mt-24">
                            Use code: <span className="font-bold text-red-600 ">{name}</span>
                        </p>
                        <p className="text-sm text-gray-700 mt-24">Valid until {expiry}</p>
                    </div>
                </div>

                {/* <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRestart}
                    className="mt-8 px-8 py-3 bg-yellow-500 text-black rounded-full text-xl font-bold shadow-md hover:shadow-lg transition-transform duration-300"
                >
                    collect it
                </motion.button> */}
            </motion.div>
        </div>
    );
};
