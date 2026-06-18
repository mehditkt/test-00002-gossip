import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Instagram, Clock, ChevronDown, Star, Leaf, BookOpen, ArrowRight, X, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import logoUrl from "@/assets/logo-gossip.png";
import heroImg from "@/assets/hero-remastered.png";
import tableDecor from "@/assets/table-decor.png";
import menuFood from "@/assets/menu-food.jpg";
import menuDrinks from "@/assets/menu-drinks.jpg";
import photo1 from "@/assets/photo1.png";
import photo2 from "@/assets/photo2.png";
import photo3 from "@/assets/photo3.png";
import { categories, type Category, type Product } from "@/lib/menu-data";

import MENU_FOOD from "@/assets/menu-food.jpg";
import MENU_DRINKS from "@/assets/menu-drinks.jpg";

const SITE_NAME = "Le Gossip Lounge";
const SITE_DESC = "Lounge & chicha estival en bord de Seine à Vitry-sur-Seine — cocktails signature, narguilés premium, burgers gourmets. Terrasse vibrante au fil de l'eau.";
const SITE_URL = "/";
const ADDRESS = "4 Quai Jules Guesde, 94400 Vitry-sur-Seine";
const PHONE = "07 87 94 40 67";
const PHONE_TEL = "+33787944067";
const MAP_EMBED = "https://www.google.com/maps?q=Le+Gossip+Lounge+4+Quai+Jules+Guesde+Vitry-sur-Seine&z=16&output=embed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Le Gossip Lounge — Summer Vibes & Chicha sur la Seine" },
      { name: "description", content: SITE_DESC },
    ],
  }),
  component: Home,
});

// A component for overlapping scrolling sections
function ParallaxSection({
  children, bg, alt, index
}: {
  children: React.ReactNode;
  bg: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={ref} className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full will-change-transform">
        <img src={bg} alt={alt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/90" />
      </motion.div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}

const ROTATING_PHRASES = [
  "Chicha Premium",
  "Cocktails Signature",
  "Ambiance Lounge",
  "Terrasse au Soleil",
  "Burgers Gourmets",
];

function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [carteOpen, setCarteOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeProduct, setActiveProduct] = useState<{ product: Product; category: Category } | null>(null);
  const [nuit, setNuit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Preload all images during the splash screen
  useEffect(() => {
    const imageSources = [heroImg, tableDecor, menuFood, menuDrinks, photo1, photo2, photo3];
    // Also preload category cover images
    categories.forEach(cat => {
      if (cat.cover) imageSources.push(cat.cover);
      cat.items.forEach(item => { if (item.image) imageSources.push(item.image); });
    });

    let loaded = 0;
    const total = imageSources.length;
    const minTime = 1800; // minimum display time in ms
    const start = Date.now();

    const checkDone = () => {
      loaded++;
      if (loaded >= total) {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minTime - elapsed);
        setTimeout(() => setLoading(false), remaining);
      }
    };

    imageSources.forEach(src => {
      const img = new Image();
      img.onload = checkDone;
      img.onerror = checkDone;
      img.src = src;
    });

    // Fallback: never stay stuck on loader
    const fallback = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(fallback);
  }, []);

  // Rotating phrase ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % ROTATING_PHRASES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Hero Scroll Effects
  const { scrollYProgress: heroScroll } = useScroll({ offset: ["start start", "end start"] });
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);

  return (
    <>
      {/* PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-6 border-4 border-foreground overflow-hidden flex items-center justify-center bg-white">
                <img src={logoUrl} alt="Le Gossip" className="w-full h-full object-cover scale-[1.7]" />
              </div>
              <h1 className="font-display text-4xl sm:text-7xl font-black text-foreground tracking-[0.2em] mb-8">LE GOSSIP</h1>
              <div className="w-48 h-1.5 bg-black/20 rounded-full mx-auto overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="w-full h-full bg-foreground rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main ref={containerRef} className="w-full bg-background overflow-x-hidden">
        {/* HERO - Sticky to allow the next section to slide over it */}
        <section id="accueil" className="relative h-[100vh] w-full bg-black">
          <motion.div style={{ scale: heroScale, y: heroY, opacity: heroOpacity }} className="absolute inset-0 origin-center will-change-transform">
            <motion.img 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: "easeOut", delay: 1.5 }}
              src={heroImg} alt="Terrasse Le Gossip Lounge" className="h-full w-full object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />
          </motion.div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="text-sm font-body uppercase tracking-[0.3em] text-white/90 mb-6 font-bold shadow-sm">
              Vitry-sur-Seine
            </motion.p>
            <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 1.8, type: "spring", bounce: 0.4 }}
              className="font-display text-7xl sm:text-9xl md:text-[11rem] font-black leading-none text-white drop-shadow-2xl">
              LE GOSSIP
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }} className="h-1 w-32 bg-primary mt-8 rounded-full shadow-[0_0_15px_rgba(249,196,28,0.8)]" />
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 max-w-xl text-lg sm:text-xl text-white/90 font-medium drop-shadow-md">
              Lounge estival au bord de l'eau. Soleil, Cocktails & Burgers.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="mt-10">
              <Link
                to="/reservation"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_10px_30px_-10px_rgba(249,196,28,0.6)] transition-transform hover:scale-[1.05]"
              >
                Réserver <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm uppercase font-bold tracking-[0.2em] flex flex-col items-center gap-2 drop-shadow-md">
            Scroll <ChevronDown size={24} />
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            initial={{ y: 0, opacity: 0, rotate: 12 }}
            animate={{ y: [-10, 10, -10], opacity: 1, rotate: [12, 5, 12] }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1, delay: 2 } 
            }}
            className="absolute top-1/4 right-8 sm:right-32 w-24 h-24 sm:w-32 sm:h-32 bg-primary rounded-full hidden sm:flex items-center justify-center shadow-[0_10px_30px_rgba(249,196,28,0.5)] z-20 border-4 border-black"
          >
            <p className="font-display font-black text-xs sm:text-sm text-black text-center uppercase leading-tight tracking-widest">Summer<br/>Vibes</p>
          </motion.div>
        </section>

        {/* ROTATING TEXT BANNER */}
        <section className="bg-[#F5F0E8] py-4 sm:py-10 overflow-hidden relative z-30 shadow-lg">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="h-auto min-h-16 flex items-center justify-center overflow-hidden py-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-primary uppercase sm:tracking-[0.15em] leading-tight"
                >
                  {ROTATING_PHRASES[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SPACER */}
        <div className="h-16 sm:h-32 bg-background border-t-2 border-primary/20"></div>

        {/* LE LIEU - Slides over the hero */}
        <section id="franchise" className="relative z-20 bg-background overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 py-10 sm:py-24 relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-20">
            <div className="flex-1 space-y-4 sm:space-y-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Le Lieu</p>
              <h2 className="font-display text-4xl sm:text-7xl font-black leading-tight text-foreground">
                Une ambiance <span className="neon-text">unique</span>.
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Niché sur le quai Jules Guesde, Le Gossip est un lounge repensé pour vibrer à l'heure d'été.
                Terrasse ensoleillée, banquettes claires, et la Seine en fond. L'endroit parfait pour prolonger vos journées.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Leaf, label: "Terrasse Végétale" },
                  { icon: Clock, label: "Ouvert 7j/7" },
                  { icon: Star, label: "Ambiance California" },
                  { icon: MapPin, label: "Vue sur Seine" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="matte-chip rounded-xl px-4 py-3 flex items-center gap-3">
                    <Icon size={18} className="text-primary shrink-0" />
                    <span className="text-sm font-bold text-foreground/90">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full"
            >
              <div className="relative aspect-square sm:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white">
                <img src={photo2} alt="Ambiance lounge" className="w-full h-full object-cover filter contrast-110 saturate-110" style={{ imageRendering: 'high-quality' }} />
              </div>
            </motion.div>
          </div>
        </section>


        {/* MENU PREVIEW */}
        <section id="menu" className="relative py-16 sm:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="font-display text-4xl sm:text-7xl font-black text-foreground">
                Notre <span className="neon-text">Sélection</span>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-6">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative aspect-[3/4] rounded-xl sm:rounded-3xl overflow-hidden shadow-xl text-left bg-black"
                >
                  <img src={cat.cover} alt={cat.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-6">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-primary mb-1 sm:mb-2">{cat.items.length} produits</p>
                    <h3 className="font-display text-[10px] sm:text-xs font-black text-white leading-tight">{cat.name}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* LA CARTE */}
        <section id="carte" className="relative py-16 sm:py-32 bg-background overflow-hidden z-20 [perspective:1000px]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-display text-4xl sm:text-7xl font-black mb-8 sm:mb-16 text-foreground">
              Notre <span className="neon-text">Carte</span>
            </h2>
            <div className="relative aspect-[4/3] sm:aspect-[21/9] max-w-5xl mx-auto rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white group flex items-center justify-center [perspective:1000px] bg-black">
              {/* Background Decor */}
              <img src={tableDecor} alt="Table Decor" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" />
              
              {/* 3D Book */}
              <div className="relative z-10 flex w-[90%] sm:w-[60%] max-w-2xl aspect-[1.414/1] shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden transition-transform duration-700 group-hover:scale-[1.03] group-hover:[transform:rotateX(0deg)] [transform:rotateX(10deg)] origin-bottom bg-white ring-1 ring-black/10">
                {/* Book Spine Shadow */}
                <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-black/5 via-black/20 to-black/5 z-20 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-black/10 z-20 pointer-events-none" />
                
                {/* Left Page (Food) */}
                <div className="w-1/2 h-full bg-[#FCFAF8] relative overflow-hidden flex flex-col p-2 sm:p-4 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03)]">
                  <img src={menuFood} alt="Menu Food" className="w-full h-full object-contain filter contrast-105 drop-shadow-sm" />
                </div>
                
                {/* Right Page (Drinks) */}
                <div className="w-1/2 h-full bg-[#FCFAF8] relative overflow-hidden flex flex-col p-2 sm:p-4 shadow-[inset_10px_0_20px_rgba(0,0,0,0.03)]">
                  <img src={menuDrinks} alt="Menu Drinks" className="w-full h-full object-contain filter contrast-105 drop-shadow-sm" />
                </div>
              </div>

              {/* View Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:flex items-center justify-center z-30">
                <button 
                  onClick={() => setCarteOpen(true)}
                  className="bg-primary text-primary-foreground rounded-full px-8 py-4 font-bold text-lg hover:scale-110 transition-transform shadow-2xl"
                >
                  Ouvrir la carte PDF
                </button>
              </div>
            </div>
            {/* Mobile Explore Button */}
            <div className="mt-6 sm:hidden">
              <button 
                onClick={() => setCarteOpen(true)}
                className="w-full bg-primary text-primary-foreground rounded-full px-6 py-4 font-black text-lg shadow-xl active:scale-95 transition-transform"
              >
                Explorer notre carte
              </button>
            </div>
          </div>
        </section>

        {/* TERRASSE */}
        <section id="terrasse" className="relative py-16 sm:py-32 bg-background overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-l-full blur-3xl -z-10" />
          <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="flex-1 w-full relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] rotate-3 blur-sm" />
              <div className="relative rounded-[2rem] shadow-2xl w-full aspect-square sm:aspect-video lg:aspect-square overflow-hidden border-8 border-white bg-black">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={nuit ? "nuit" : "jour"}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    src={nuit ? photo3 : photo1} 
                    alt="Terrasse Gossip" 
                    className="absolute inset-0 w-full h-full object-cover filter contrast-110 saturate-110" 
                    style={{ imageRendering: 'high-quality' }}
                  />
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 w-full px-4 sm:px-0 sm:w-auto">
                <button 
                  onClick={() => setNuit(!nuit)}
                  className="w-full sm:w-auto bg-foreground text-background font-bold text-sm sm:text-base px-6 py-3 sm:py-4 rounded-full shadow-2xl hover:scale-105 transition-transform whitespace-nowrap border border-white/20"
                >
                  {nuit ? "Voir la terrasse de jour ☀️" : "Afficher la terrasse de nuit 🌙"}
                </button>
              </div>
            </motion.div>
            <div className="flex-1 space-y-4 sm:space-y-6">
              <h2 className="font-display text-4xl sm:text-6xl font-black leading-tight text-foreground">
                La terrasse <span className="neon-text">idéale.</span>
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Nos tentes élégantes, un mobilier clair et confortable, et une vue dégagée sur l'eau. L'endroit parfait pour chiller entre amis, profiter d'une belle journée d'été ou d'une soirée douce.
              </p>
            </div>
          </div>
        </section>

        {/* POSITION */}
        <section id="position" className="relative py-16 sm:py-32 bg-background overflow-hidden">
          <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />
          <div className="absolute inset-0 grain-overlay pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-8 sm:mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-2 sm:mb-4">Position</p>
              <h2 className="font-display text-4xl sm:text-7xl font-black leading-tight text-foreground">
                Où nous <span className="neon-text">trouver</span>.
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start">
              <div className="space-y-4 sm:space-y-8">
                <div className="matte-card rounded-3xl sm:rounded-[2rem] p-5 sm:p-10 shadow-xl border border-black/5 bg-white">
                  <div className="flex items-start gap-5">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-black mb-2">Adresse Exacte</h3>
                      <p className="text-lg font-medium text-foreground/80 leading-relaxed mb-4">
                        4 Quai Jules Guesde, 94400 Vitry-sur-Seine, France
                      </p>
                  <a href="https://goo.gl/maps/QG2T2uVwM5X2" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
                        <ArrowRight size={16} /> Itinéraire Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="matte-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg text-center bg-white border border-black/5">
                    <Clock size={24} className="text-primary mx-auto mb-2 sm:mb-4" />
                    <h4 className="font-display text-lg sm:text-xl font-bold mb-1 sm:mb-2">Horaires</h4>
                    <p className="text-sm sm:text-base font-medium text-foreground/70">Ouvert 7j/7<br />de 18h à 02h</p>
                  </div>
                  <div className="matte-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg text-center bg-white border border-black/5">
                    <Phone size={24} className="text-primary mx-auto mb-2 sm:mb-4" />
                    <h4 className="font-display text-lg sm:text-xl font-bold mb-1 sm:mb-2">Téléphone</h4>
                    <p className="text-sm sm:text-base font-medium text-foreground/70">07 87 94 40 67</p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white bg-white">
                <iframe 
                  title="Carte Le Gossip Lounge" 
                  src="https://www.google.com/maps?q=Le+Gossip+Lounge+4+Quai+Jules+Guesde+Vitry-sur-Seine&z=16&output=embed" 
                  className="absolute inset-0 w-full h-full" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <section id="contact" className="relative pt-16 pb-24 bg-foreground text-background rounded-t-[3rem]">
          <div className="max-w-4xl mx-auto px-6">
            
            <div className="flex items-center justify-start gap-4 sm:gap-6 mb-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden flex-shrink-0 bg-white">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover scale-[1.7]" />
              </div>
              <h2 className="text-5xl sm:text-7xl text-primary" style={{ fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', cursive" }}>
                Le Gossip
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <a href={`tel:${PHONE_TEL}`} className="bg-white/10 hover:bg-primary/90 p-8 rounded-3xl transition-colors group text-center">
                <Phone className="mx-auto mb-4 text-primary group-hover:text-foreground" size={32} />
                <p className="text-sm uppercase tracking-widest text-background/60 group-hover:text-foreground/70">Appelez</p>
                <p className="font-bold mt-2 text-lg group-hover:text-foreground">{PHONE}</p>
              </a>
              <a href="https://instagram.com/legossip" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-primary/90 p-8 rounded-3xl transition-colors group text-center">
                <Instagram className="mx-auto mb-4 text-primary group-hover:text-foreground" size={32} />
                <p className="text-sm uppercase tracking-widest text-background/60 group-hover:text-foreground/70">Suivez</p>
                <p className="font-bold mt-2 text-lg group-hover:text-foreground">@legossip</p>
              </a>
              <a href={MAP_EMBED} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-primary/90 p-8 rounded-3xl transition-colors group text-center">
                <MapPin className="mx-auto mb-4 text-primary group-hover:text-foreground" size={32} />
                <p className="text-sm uppercase tracking-widest text-background/60 group-hover:text-foreground/70">Adresse</p>
                <p className="font-bold mt-2 text-sm sm:text-base group-hover:text-foreground leading-snug">4 Quai Jules Guesde<br/>94400 Vitry-sur-Seine</p>
              </a>
            </div>
            
          </div>
          
          {/* PROMO FOOTER */}
          <div className="absolute bottom-4 left-0 w-full text-center">
            <p className="text-[10px] sm:text-xs text-white/30 tracking-widest uppercase font-medium">
              Le Gossip 2026 © <span className="mx-2">|</span> MHD lab & dev
            </p>
          </div>
        </section>
      </main>

      {/* OVERLAY : Carte */}
      <AnimatePresence>
        {carteOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] overflow-y-auto bg-background/95 backdrop-blur-md">
            <button onClick={() => setCarteOpen(false)} className="fixed top-6 right-6 z-10 bg-white shadow-xl rounded-full p-4 hover:scale-110 transition-transform"><X size={24} className="text-foreground" /></button>
            <div className="relative min-h-dvh flex flex-col items-center py-20 px-4">
              <h3 className="font-display text-5xl font-black mb-12"><span className="neon-text">La Carte</span></h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full">
                {[MENU_FOOD, MENU_DRINKS].map((src, i) => (
                  <motion.div key={i} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.2 }} className="relative aspect-[1/1.414] rounded-xl overflow-hidden shadow-2xl bg-white border-8 border-white">
                    <img src={src} alt="Menu" className="absolute inset-0 h-full w-full object-contain" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY : Catégorie */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] overflow-y-auto bg-white"
          >
            <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
               <img src={activeCategory.cover} alt="" className="w-full h-full object-cover opacity-50" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors mb-12 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <ArrowLeft size={16} /> Retour au menu
              </button>

              <div className="mb-12">
                <h3 className="font-display text-6xl font-black text-foreground mb-4">{activeCategory.name}</h3>
                <p className="text-xl text-foreground/70 font-medium">{activeCategory.tagline}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCategory.items.map((p, i) => (
                  <motion.button
                    key={p.name + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    onClick={() => setActiveProduct({ product: p, category: activeCategory })}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-background rounded-3xl p-4 shadow-lg flex items-center gap-6 border border-black/5 text-left transition-all hover:shadow-xl hover:border-primary/20"
                  >
                    <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden shadow-inner">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-display text-xl font-bold">{p.name}</h4>
                        <span className="font-display font-black text-lg text-primary">{p.price}</span>
                      </div>
                      <p className="text-sm text-foreground/70 line-clamp-2">{p.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY : Produit */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex flex-col md:flex-row bg-background"
          >
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black">
              <motion.img
                key={activeProduct.product.image}
                src={activeProduct.product.image}
                alt={activeProduct.product.name}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
              >
                <ArrowLeft size={20} className="text-foreground" />
              </button>
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center p-8 md:p-16 bg-white overflow-y-auto">
              <div className="max-w-md w-full mx-auto">
                <p className="text-sm uppercase font-bold tracking-[0.2em] text-primary mb-4">{activeProduct.category.name}</p>
                <h2 className="font-display text-5xl font-black text-foreground mb-6">{activeProduct.product.name}</h2>
                <span className="inline-block bg-primary/10 text-primary font-black text-3xl px-6 py-2 rounded-full mb-8">
                  {activeProduct.product.price}
                </span>
                <p className="text-lg text-foreground/80 leading-relaxed mb-10">{activeProduct.product.desc}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
