import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import bg from "../assets/bg.png";
import vector from "../assets/Vector.png";
import vector2 from "../assets/star1.png";
import vector3 from "../assets/star2.png";



import count from "../assets/ep_timer.png";

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const FallingWord = ({ word, index, totalWords, onDrop, screenWidth }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "word",
        item: { word },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                onDrop(item.word);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Adjusted font size based on device size and word length
    const getFontSize = () => {
        const lengthAdjustment = word.length > 8 ? " text-xs" : word.length > 5 ? " text-sm" : "";
        if (screenWidth < 375) return `text-lg${lengthAdjustment}`;
        if (screenWidth < 768) return `text-xl${lengthAdjustment}`;
        return `text-2xl${lengthAdjustment}`;
    };

    return (
        <motion.div
            ref={drag}
            style={{
                touchAction: "none", // Prevents scrolling while dragging on touch devices
                transform: `translate(-50%, -50%)`, // Center the element at its position
            }}
            className={`
                px-8 py-4
                bg-gray-700/90 
                text-white 
                ${getFontSize()}
                rounded-full 
                cursor-move 
                shadow-lg 
                backdrop-blur-sm 
                border border-white/50
                hover:bg-gray-600/90 
                active:bg-gray-500/90
                transition-colors
                touch-none
                select-none
                ${isDragging ? "opacity-50 scale-105" : "opacity-100"}
            `}
        >
            {word}
        </motion.div>
    );
};

const DropZone = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "word",
        drop: () => ({}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`
                h-12 sm:h-16 md:h-20 
                w-full 
                border-2 
                border-dashed 
                rounded-lg 
                flex 
                items-center 
                justify-center 
                text-white 
                text-sm sm:text-base md:text-xl 
                mt-4 sm:mt-8 md:mt-12
                transition-colors
                duration-200
                ${isOver ? "border-white bg-gray-700/30" : "border-gray-300"}
            `}
        >
            {isTouchDevice() ? "Tap and hold to drag words here" : "Drag a word here"}
        </div>
    );
};

const BlinkingWrongAnswer = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsVisible((prev) => !prev);
        }, 500);

        const timer = setTimeout(() => {
            clearInterval(blinkInterval);
            onComplete();
        }, 5000);

        return () => {
            clearInterval(blinkInterval);
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-red-600/90 z-[999] overflow-hidden"
                >
                    <div className="absolute top-1/2 left-0 w-full">
                        <div className="w-full h-10 sm:h-12 md:h-16 bg-white flex items-center justify-center">
                            <span className="text-red-600 text-lg sm:text-xl md:text-4xl font-bold">WRONG ANSWER</span>
                        </div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                        <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-white mb-8 sm:mb-12 md:mb-24">ONE MORE CHANCE</h2>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const FallingWordsGame = ({ question, onAnswer, timeLimit }) => {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [showWrongAnswer, setShowWrongAnswer] = useState(false);
    const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setTimeLeft(timeLimit);
    }, [question, timeLimit]);

    useEffect(() => {
        if (timeLeft > 0 && !showWrongAnswer) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 500);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            onAnswer(false);
        }
    }, [timeLeft, onAnswer, showWrongAnswer]);

    const handleDrop = (word) => {
        if (word === question.answer) {
            onAnswer(true);
        } else {
            setShowWrongAnswer(true);
        }
    };

    const handleWrongAnswerComplete = () => {
        setShowWrongAnswer(false);
        onAnswer(false);
    };

    const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

    return (
        <DndProvider backend={backend}>
            <div className="relative min-h-screen w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
                    style={{ backgroundImage: `url(${bg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black/70" />

                <div className="relative min-h-screen w-full p-2 sm:p-4 md:p-6 lg:p-8">
                    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-6">
                        {/* Left Box */}
                        <div className="w-full lg:w-1/2 bg-black/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 relative border border-[#818080] min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]">
                            <div className="hidden md:flex absolute bottom-6 left-6 items-center space-x-2">
                                <img src={vector} alt="vector" className="h-6 sm:h-8 md:h-12" />
                                <img src={vector3} alt="star" className="h-4 sm:h-6 md:h-8 mt-6" />
                            </div>
                            <div className="hidden md:block absolute bottom-6 right-6">
                                <img src={vector2} alt="star" className="h-8 sm:h-12 md:h-16" />
                            </div>

                            <h2 className="text-sm sm:text-base md:text-lg font-medium mb-2 sm:mb-3 md:mb-4 text-white font-poppins">
                                Complete the Riddle: <br /> <br />
                                <span className="font-poppins font-regular text-xs sm:text-sm md:text-base">
                                    {question.question}
                                </span>
                            </h2>
                            <DropZone onDrop={handleDrop} />
                        </div>

                        {/* Right Box - Words Container */}
                        <div className="w-full lg:w-1/2 bg-black/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 relative border border-[#818080] min-h-[250px] sm:min-h-[300px] lg:min-h-[500px] overflow-hidden">
                            <div className="mt-1 flex justify-end items-center space-x-2 mb-12">
                                <img src={count} alt="countdown" className="h-4 sm:h-5 md:h-6" />
                                <p className="text-base sm:text-lg md:text-xl font-bold text-white">{timeLeft}s</p>
                            </div>

                            {/* Words container with explicit height */}
                            <div className="relative h-[80%] w-full text-lg sm:text-xl md:text-3xl lg:text-4xl font-judson p-12 text-center align-center justify-center">
                                <div className="flex flex-wrap gap-2">
                                    {question.options.map((word, index) => (
                                        <FallingWord
                                            key={index}
                                            word={word}
                                            index={index}
                                            totalWords={question.options.length}
                                            onDrop={handleDrop}
                                            screenWidth={screenWidth}
                                        />
                                    ))}
                                </div>
                            </div>

                            {showWrongAnswer && (
                                <BlinkingWrongAnswer onComplete={handleWrongAnswerComplete} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default FallingWordsGame;
