/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MapPin, Search, ChevronRight, Menu, X, Check, Droplets } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-2 group">
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-coke-red dark:text-white transition-transform group-hover:scale-105"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" />
      <path 
        d="M 65 35 
           C 40 30, 30 50, 45 60
           C 60 70, 45 85, 25 75" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M 75 55 
           C 65 50, 55 60, 65 70" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
    <div className="text-xl md:text-2xl font-display italic font-bold tracking-tighter text-coke-red dark:text-white">
      Coca-Cola
    </div>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Story', href: '#story' },
    { label: 'Impact', href: '#impact' },
    { label: 'Origins', href: '#origins' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-premium ${
        scrolled 
          ? 'glass-blur dark:bg-coke-dark/80 dark:backdrop-blur-md shadow-sm border-b border-coke-silver dark:border-white/10 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#" className="z-50 relative focus-visible:outline-coke-red">
          <Logo />
          <span className="sr-only">Coca-Cola Home</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-coke-dark/60 hover:text-coke-red dark:text-coke-light/60 dark:hover:text-white transition-colors focus-visible:outline-coke-red px-2 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs font-bold uppercase tracking-widest py-2 px-4 border border-coke-silver dark:border-white/20 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all focus-visible:outline-coke-red"
            aria-label="Toggle theme"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <a fill="true"
            href="#find" 
            className="bg-coke-red text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full shadow-lg shadow-coke-red/30 btn-hover transition-all focus-visible:outline-offset-4 focus-visible:outline-coke-red"
          >
            Find Near You
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-coke-dark dark:text-coke-light"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-coke-light dark:bg-coke-dark z-40 flex flex-col items-center justify-center gap-8 md:hidden px-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-display text-coke-dark dark:text-coke-light hover:text-coke-red dark:hover:text-coke-red transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="w-full h-px bg-black/10 dark:bg-white/10 my-4 max-w-xs"></div>
            <button 
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenuOpen(false);
              }}
              className="text-lg font-medium text-coke-dark/60 dark:text-coke-light/60"
            >
              Switch to {darkMode ? 'Light' : 'Dark'} Mode
            </button>
            <a 
              href="#find" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-coke-red text-white border-coke-red px-8 py-4 rounded-full text-lg w-full max-w-xs text-center mt-4"
            >
              Find Near You
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

const InteractiveBottle = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const hoverAnimation = prefersReducedMotion ? {
    opacity: 1,
    filter: "brightness(1.1)",
  } : {
    y: -15,
    rotate: 3,
    scale: 1.02,
    filter: "brightness(1.1) drop-shadow(0 25px 25px rgba(244,0,9,0.2))",
  };

  const bubbleVariants = {
    initial: { y: 0, opacity: 0, scale: 0.5 },
    animate: (i: number) => ({
      y: -50 - (i * 20),
      x: Math.sin(i) * 10,
      opacity: [0, 0.8, 0],
      scale: Math.random() * 0.5 + 0.5,
      transition: {
        duration: 1.5 + Math.random(),
        repeat: Infinity,
        delay: i * 0.2,
      }
    })
  };

  return (
    <div 
      className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[1/2.2] mx-auto group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Light halo */}
      <div className={`absolute inset-0 bg-coke-red/20 dark:bg-coke-red/10 blur-3xl rounded-full transition-all duration-700 ${isHovered ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`} />

      {/* The Bottle Object */}
      <motion.div 
        className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-end pb-8"
        initial={{ y: 0, rotate: 0 }}
        animate={isHovered ? hoverAnimation : { y: 0, rotate: 0, scale: 1, filter: "brightness(1) drop-shadow(0 5px 15px rgba(0,0,0,0.1))" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Placeholder styling for a premium bottle */}
        <div className="relative w-[140px] md:w-[170px] h-[320px] md:h-[400px] flex items-center justify-center">
          {/* Glass background structure */}
          <div className="absolute inset-0 rounded-[60px] bg-coke-dark shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden border-4 border-[#2d2d2d] clip-bottle">
            
            {/* Reflection Sweep */}
            <motion.div 
              className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[-150%]"
              animate={{ translateX: isHovered ? ['-150%', '150%'] : '-150%' }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            
            {/* Logo area */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center rotate-[-90deg]">
              <div className="text-white font-display font-black tracking-tighter text-4xl opacity-90 drop-shadow-md">
                Coca-Cola
              </div>
            </div>

            {/* Condensation Sparkles */}
            {isHovered && !prefersReducedMotion && (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_10px)] bg-[length:20px_20px] opacity-50 mix-blend-overlay"></div>
            )}
          </div>
          
          {/* Cap */}
          <div className="absolute -top-[10px] w-[50px] h-[30px] bg-gradient-to-b from-coke-red to-black/90 rounded-t-lg border-b-2 border-black/80"></div>
          
          {/* External Bubbles */}
          {isHovered && !prefersReducedMotion && [...Array(8)].map((_, i) => (
             <div
               key={i}
               className="carbon-bubble absolute w-1.5 h-1.5 bg-white rounded-full blur-[0.5px]"
               style={{
                 left: `${30 + Math.random() * 40}%`,
                 bottom: '20%',
                 animationDelay: `${i * 0.2}s`
               }}
             />
          ))}
        </div>
      </motion.div>

      {/* Shadow Base */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[160px] h-[30px] bg-black/30 dark:bg-black/80 blur-xl rounded-full"
        animate={{ 
          scale: isHovered ? 1.2 : 1, 
          opacity: isHovered ? 0.2 : 0.4 
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-16 px-4 md:px-8 overflow-hidden flex items-center justify-center">
      {/* Background layer */}
      <div className="absolute inset-0 hero-gradient dark:bg-coke-dark dark:to-black z-[-2]"></div>
      
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-coke-red/5 dark:bg-coke-red/10 rounded-full blur-[100px] translate-x-1/3 z-[-1]"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-8 md:pt-0">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-fluid-hero leading-[1.1] font-bold text-balance mb-6 text-coke-dark dark:text-white"
          >
            Taste the <span className="text-coke-red">Feeling.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-coke-dark/70 dark:text-coke-light/70 max-w-lg mb-10 text-balance leading-relaxed"
          >
            Experience the crisp, refreshing sound of a newly opened bottle. More than just a drink, it's the beginning of a moment perfectly chilled.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a 
              href="#flavors" 
              className="w-full sm:w-auto px-10 py-4 bg-coke-red text-white rounded-full font-bold uppercase text-sm tracking-wider text-center btn-hover transition-all flex items-center justify-center gap-2 group focus-visible:outline-offset-4 focus-visible:outline-coke-red"
            >
              Explore Flavors
            </a>
            <a 
              href="#story" 
              className="w-full sm:w-auto px-10 py-4 border border-coke-silver dark:border-white/20 text-coke-dark dark:text-white rounded-full font-bold uppercase text-sm tracking-wider text-center hover:bg-white dark:hover:bg-white/5 transition-all focus-visible:outline-offset-4 focus-visible:outline-coke-red"
            >
              Our Story
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex gap-8 items-center opacity-60 text-coke-dark dark:text-white"
          >
            <div className="text-center">
              <p className="text-2xl font-bold">1.9B+</p>
              <p className="text-[10px] uppercase tracking-tighter">Daily Servings</p>
            </div>
            <div className="w-px h-8 bg-coke-dark/20 dark:bg-white/20"></div>
            <div className="text-center">
              <p className="text-2xl font-bold">200+</p>
              <p className="text-[10px] uppercase tracking-tighter">Countries</p>
            </div>
          </motion.div>
        </div>

        {/* Interactive Visual Centerpiece */}
        <div className="order-1 lg:order-2 flex justify-center items-center w-full h-[500px] lg:h-[600px] relative">
          <InteractiveBottle />
        </div>

      </div>
    </section>
  );
};

const StorySection = () => {
  return (
    <section id="story" className="py-24 md:py-32 px-4 md:px-8 bg-white dark:bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group w-full max-w-md mx-auto md:max-w-none shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1600271886742-f049cd451b66?auto=format&fit=crop&q=80&w=1000" 
            alt="Cold Coca-Cola bottle with condensation" 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-coke-dark/40 dark:text-white/40 mb-2 block">The Ritual</h2>
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-coke-dark dark:text-white font-bold leading-[1.1] mb-6 text-balance">
            A sip of <br/>pure <i className="text-coke-red">refreshment.</i>
          </h3>
          <div className="h-px w-16 bg-coke-red/30 mb-8"></div>
          <p className="text-coke-dark/60 dark:text-coke-light/70 text-sm leading-relaxed mb-6">
            There is a precise moment right after you pop the cap. The sudden hiss of carbonation, the chill of the glass against your hand, and that unmistakable first taste.
          </p>
          <p className="text-coke-dark/60 dark:text-coke-light/70 text-sm leading-relaxed mb-10">
            It’s not just a beverage. It’s an emotional reset, a reason to pause, and a classic companion to the world's best meals. Decades later, the recipe remains iconic, the feeling untouched.
          </p>
          <a href="#origins" className="inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-coke-dark dark:text-white hover:text-coke-red dark:hover:text-coke-red transition-colors w-max group pb-1 border-b border-coke-dark/30 dark:border-white/30 hover:border-coke-red focus-visible:outline-coke-red">
            Uncover the legacy <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

const FlavorSpotlight = () => {
  const flavors = [
    {
      id: "classic",
      name: "Original Taste",
      desc: "The classic, undeniable refreshment that started it all.",
      color: "bg-[#F40009]",
      textColor: "text-white",
      className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto", // Dominant card
    },
    {
      id: "zero",
      name: "Zero Sugar",
      desc: "Real Coca-Cola taste, zero calories.",
      color: "bg-black",
      textColor: "text-white",
      className: "aspect-square",
    },
    {
      id: "diet",
      name: "Diet Coke",
      desc: "Crisp, light, with a distinct, beloved flavor.",
      color: "bg-[#E0E0E0] dark:bg-[#2d2d2d]",
      textColor: "text-gray-900 dark:text-white",
      className: "aspect-square",
    },
    {
      id: "cherry",
      name: "Cherry",
      desc: "The classic twist of sweet cherry.",
      color: "bg-[#7c0c21]",
      textColor: "text-white",
      className: "aspect-square md:col-span-2",
    }
  ];

  return (
    <section id="products" className="py-24 px-4 md:px-8 bg-white border-t border-coke-silver/50 dark:bg-[#0a0a0a] dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:w-2/3">
          <h2 className="font-display text-4xl md:text-5xl text-coke-dark dark:text-white font-bold mb-4">
            Find your flavor.
          </h2>
          <p className="text-sm text-coke-dark/50 dark:text-coke-light/60">Every bottle is an invitation. Choose your iconic taste.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 min-h-[600px]">
          {flavors.map((flavor) => (
            <div 
              key={flavor.id} 
              className={`relative rounded-3xl p-8 flex flex-col justify-end overflow-hidden group hover:-translate-y-1 transition-transform duration-500 hover:shadow-xl ${flavor.color} ${flavor.className}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity"></div>
              
              {/* Product Placeholder Hint */}
              <div className="absolute top-8 right-8 w-16 h-48 md:w-24 md:h-64 border border-white/20 rounded-full opacity-50 rotate-12 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest opacity-50 rotate-[-90deg] font-bold">Bottle</span>
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ArrowRight size={18} className={flavor.textColor} />
                </div>
                <h3 className={`font-display text-2xl md:text-3xl font-bold mb-2 ${flavor.textColor}`}>
                  {flavor.name}
                </h3>
                <p className={`${flavor.textColor} opacity-60 text-[10px] uppercase font-bold tracking-widest max-w-[250px]`}>
                  {flavor.desc}
                </p>
                <div className="mt-8 opacity-0">
                  <a href={`#${flavor.id}`} className="sr-only">Explore {flavor.name}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SensoryExperience = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1554866585-cd94860874b7?auto=format&fit=crop&q=80&w=2000" 
          alt="Macro shot of Coca-Cola carbonation and ice" 
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        <Droplets className="w-12 h-12 text-white mx-auto mb-8 opacity-80" />
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight drop-shadow-xl">
          Effervescence in every pour.
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
          Whether paired with your favorite meal or enjoyed on a hot summer afternoon, 
          nothing compares to the feeling.
        </p>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section id="impact" className="py-24 px-4 md:px-8 bg-coke-light dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-coke-silver dark:border-white/10 pt-16 mt-8">
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl font-bold text-coke-dark dark:text-white mb-4">Shared around the world.</h2>
            <p className="text-sm text-coke-dark/50 dark:text-coke-light/60">Built on moments of connection, one bottle at a time.</p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <blockquote className="bg-white dark:bg-coke-gray/30 p-8 rounded-3xl relative shadow-sm">
               <span className="text-6xl text-coke-red absolute top-4 left-4 opacity-20 font-display">"</span>
               <p className="relative z-10 text-sm md:text-base text-coke-dark/80 dark:text-white mb-6 leading-relaxed pt-4">
                 It's not just a soda. It's the taste of summer cookouts, road trips, and Friday nights with friends.
               </p>
               <cite className="text-[10px] text-coke-dark/40 dark:text-coke-light/40 not-italic font-bold uppercase tracking-[0.2em] block mt-auto">
                 — The Real Magic Campaign
               </cite>
            </blockquote>
            
            <div className="bg-coke-dark text-white p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-4xl font-bold mb-2">Sustainability at Heart</div>
                <div className="text-xs opacity-60 leading-relaxed mb-6">We're aiming for 100% recyclable packaging by 2025. Every bottle has a second life.</div>
              </div>
              <div className="relative z-10 mt-auto">
                <button className="text-[10px] uppercase font-bold tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all">Read Our Impact</button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-coke-red/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConversionBand = () => {
  return (
    <section id="find" className="py-24 px-4 md:px-8 bg-coke-dark dark:bg-black">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-coke-red rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-coke-red/10">
          <MapPin className="text-white" size={28} />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Find Coca-Cola near you.
        </h2>
        <p className="text-sm md:text-base text-white/50 mb-12 max-w-xl">
          Enter your location to discover the closest restaurants, convenience stores, and retailers carrying your favorite flavor.
        </p>

        <form className="w-full max-w-md flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative w-full">
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <Search className="text-white/40" size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Zip code, city..." 
              className="w-full bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-full py-4 pl-14 pr-6 focus:outline-none focus:ring-1 focus:ring-coke-red focus:border-coke-red transition-all text-sm"
              aria-label="Location search"
            />
          </div>
          <button 
            type="submit" 
            className="w-full sm:w-auto px-8 py-4 bg-coke-red text-white text-xs font-bold uppercase tracking-widest rounded-full btn-hover transition-all whitespace-nowrap active:scale-95 focus-visible:outline-offset-4 focus-visible:outline-coke-red shadow-lg shadow-coke-red/20"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black py-12 px-4 md:px-8 border-t border-coke-silver/50 dark:border-white/10 text-[10px] uppercase tracking-widest font-bold text-coke-dark/40 dark:text-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <Logo />
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-coke-red dark:hover:text-coke-red transition-colors">Instagram</a>
            <a href="#" className="hover:text-coke-red dark:hover:text-coke-red transition-colors">Twitter</a>
            <a href="#" className="hover:text-coke-red dark:hover:text-coke-red transition-colors">TikTok</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-coke-silver/50 dark:border-white/10 pt-8">
          <p>© {new Date().getFullYear()} The Coca-Cola Company. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-coke-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-coke-red transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-coke-red transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans antialiased selection:bg-coke-red selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <StorySection />
        <FlavorSpotlight />
        <SensoryExperience />
        <SocialProof />
        <ConversionBand />
      </main>
      <Footer />
    </div>
  );
}

