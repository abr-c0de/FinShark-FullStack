import hero from "./hero.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Variants } from "framer-motion";


const Hero = () => {
  // Animation variants for staggered entrance
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

 const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Optional: A subtle background glow effect */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent -z-10" />

      <div className="container flex flex-col-reverse items-center mx-auto p-8 lg:flex-row lg:min-h-[80vh]">
        
        {/* TEXT CONTENT */}
        <motion.div 
          className="flex flex-col space-y-8 mb-20 m-10 lg:m-10 xl:m-20 lg:w-1/2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-extrabold text-center tracking-tight lg:text-6xl lg:max-w-md lg:text-left"
          >
            Financial data <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-400">
              with no news.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-center text-gray-500 leading-relaxed lg:max-w-md lg:text-left"
          >
            Search relevant financial documents without fear mongering and fake
            news. Just the raw data you need to make smart decisions.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mx-auto lg:mx-0 pt-4">
            <Link
              to="SearchPage"
              className="group flex items-center justify-center gap-3 py-4 px-8 text-lg font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.div 
          className="mb-16 mx-auto relative md:w-3/4 lg:mb-0 lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Continuous floating animation */}
          <motion.img 
            src={hero} 
            alt="Financial Dashboard Preview" 
            className="w-full max-w-lg object-contain drop-shadow-2xl"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;