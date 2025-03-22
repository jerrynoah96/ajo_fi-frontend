import { motion } from 'framer-motion';

export const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Circle background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-100 rounded-full opacity-50" />
        
        {/* Animated coins */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10"
        >
          <div className="w-16 h-16 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center text-2xl">
            ₦
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-10 left-10"
        >
          <div className="w-12 h-12 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center">
            ₦
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 