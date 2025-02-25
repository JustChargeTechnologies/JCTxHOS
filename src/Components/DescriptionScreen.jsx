import React from "react";
import bg from "../assets/bg.png";
import vector from "../assets/Vector.png";
import vector2 from "../assets/star1.png";
import vector3 from "../assets/star2.png";
import count from "../assets/countdown.gif";

const GameDescription = ({ onStartGame }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background image with blur */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
                style={{
                    backgroundImage: `url(${bg})`,
                }}
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black/70" />

            {/* Main content */}
            <div className="relative min-h-screen w-full p-6 sm:p-4 md:p-6 lg:p-8">
                <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-8">
                    {/* Left Box */}
                    <div className="w-full lg:w-1/2 bg-black/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative border border-[#818080] min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-white font-poppins">
                            GAME DESCRIPTION :
                        </h2>
                        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-5 md:mb-6 font-poppins">
                            Welcome To "Riddle Rush"! You Have 60 Seconds To Complete As Many
                            Riddle As Possible. Two Tries Per Riddle, So Choose Wisely. Earn
                            Coupons For Correct Answers, But Wrong Ones Could Cost You. Ready
                            To Play?
                        </p>

                        {/* Decorative Elements */}
                        <div className="hidden md:flex absolute bottom-8 left-8 items-center space-x-2">
                            <img src={vector} alt="vector" className="h-8 sm:h-12 md:h-16" />
                            <img src={vector3} alt="star" className="h-6 sm:h-8 md:h-10 mt-8" />
                        </div>

                        <div className="hidden md:block absolute bottom-8 right-8">
                            <img src={vector2} alt="star" className="h-12 sm:h-16 md:h-24" />
                        </div>
                    </div>

                    {/* Right Box */}
                    <div className="w-full lg:w-1/2 bg-black/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center border border-[#818080] min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
                        <div className="text-white mb-6 sm:mb-8 md:mb-10">
                            <img
                                src={count}
                                alt="countdown"
                                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto"
                            />
                        </div>

                        <button
                            className="
                                bg-gray-700/90 shadow-lg  shadow-[#2CB1D878]  text-white  px-6 sm:px-8 py-2.5 sm:py-3 rounded-full 
                                text-lg sm:text-xl md:text-2xl
                                hover:bg-gray-600/90 
                                active:bg-gray-500/90
                                transition-all 
                                duration-300 
                                hover:shadow-[#2CB1D878] 
                                animate-pulse 
                                hover:shadow-lg
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-[#2CB1D878]
                                touch-none
                            "
                            onClick={onStartGame}
                        >
                            GO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDescription;