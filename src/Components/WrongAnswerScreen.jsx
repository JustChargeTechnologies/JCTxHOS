import React from 'react'
import { motion } from 'framer-motion'

const BlinkingWrongAnswer = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Set up blinking animation
        const blinkInterval = setInterval(() => {
            setIsVisible(prev => !prev)
        }, 500) // Blink every 500ms

        // Set up auto-dismiss after 5 seconds
        const timer = setTimeout(() => {
            clearInterval(blinkInterval)
            onComplete()
        }, 5000)

        return () => {
            clearInterval(blinkInterval)
            clearTimeout(timer)
        }
    }, [onComplete])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-red-600/90 text-white overflow-hidden rounded-3xl flex flex-col"
                >
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <h2 className="text-4xl font-bold text-center">ONE MORE CHANCE</h2>
                        <h1 className="text-5xl font-bold text-center">WRONG ANSWER</h1>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default WrongAnswerScreen
