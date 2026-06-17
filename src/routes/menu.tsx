import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";

import heroBg from "@/assets/menu/menu-hero.jpg";
import cheeseBurger from "@/assets/menu/cheese-burger.jpg";
import chickenBurger from "@/assets/menu/chicken-burger.jpg";
import gossipBurger from "@/assets/menu/gossip-burger.jpg";
import hotdog from "@/assets/menu/hotdog.jpg";
import caesar from "@/assets/menu/caesar.jpg";
import mozzaSticks from "@/assets/menu/mozza-sticks.jpg";
import chickenFingers from "@/assets/menu/chicken-fingers.jpg";
import frites from "@/assets/menu/frites.jpg";
import milkshakeClassic from "@/assets/menu/milkshake-classic.jpg";
import milkshakeSpecial from "@/assets/menu/milkshake-special.jpg";
import churrosSucre from "@/assets/menu/churros-sucre.jpg";
import churrosNutella from "@/assets/menu/churros-nutella.jpg";
import crepeSucre from "@/assets/menu/crepe-sucre.jpg";
import crepeNutellaBanane from "@/assets/menu/crepe-nutella-banane.jpg";
import fondant from "@/assets/menu/fondant.jpg";
import tarteTatin from "@/assets/menu/tarte-tatin.jpg";
import chicha from "@/assets/menu/chicha.jpg";
import boraBora from "@/assets/menu/bora-bora.jpg";
import virginMojito from "@/assets/menu/virgin-mojito.jpg";
import strawberryMojito from "@/assets/menu/strawberry-mojito.jpg";
import mojitoBull from "@/assets/menu/mojito-bull.jpg";
import nightRider from "@/assets/menu/night-rider.jpg";
import redCorvette from "@/assets/menu/red-corvette.jpg";
import sodas from "@/assets/menu/sodas.jpg";
import redbull from "@/assets/menu/redbull.jpg";
import eauJus from "@/assets/menu/eau-jus.jpg";
import sirops from "@/assets/menu/sirops.jpg";
import theMenthe from "@/assets/menu/the-menthe.jpg";
import cafe from "@/assets/menu/cafe.jpg";
import chocolatChaud from "@/assets/menu/chocolat-chaud.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Carte & Menu — Le Gossip Lounge · Vitry-sur-Seine" },
      { name: "description", content: "Découvrez la carte complète du Gossip Lounge : burgers signature, cocktails, narguilés premium, milkshakes, crêpes, churros et desserts. Au bord de la Seine à Vitry-sur-Seine." },
      { property: "og:title", content: "Carte — Le Gossip Lounge" },
      { property: "og:description", content: "Burgers, cocktails, chichas premium, milkshakes et desserts maison au bord de la Seine." },
      { property: "og:image", content: heroBg },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

type Item = {
  category: string;
  name: string;
  price: string;
  desc: string;
  image: string;
  align?: "left" | "right";
};

const items: Item[] = [
  // MILKSHAKES
  { category: "Milkshakes", name: "Milkshake Classic", price: "9 €", desc: "33cl — Au choix : fraise, vanille, chocolat ou fruit de la passion. Onctueux, frais, intemporel.", image: milkshakeClassic, align: "left" },
  { category: "Milkshakes", name: "Milkshake Spécial", price: "10 €", desc: "33cl — Au choix : Kinder Bueno, Schokobons, Oreo ou Speculoos. La gourmandise à l'état pur.", image: milkshakeSpecial, align: "right" },

  // BURGERS
  { category: "Starter & Burgers", name: "Cheese Burger", price: "14 €", desc: "Steak haché, cheddar fondant, salade, tomate, oignons grillés, ketchup, mayonnaise & frites maison.", image: cheeseBurger, align: "left" },
  { category: "Starter & Burgers", name: "Chicken Burger", price: "14 €", desc: "Filet de poulet pané, cheddar, salade, sauce miel moutarde & frites maison.", image: chickenBurger, align: "right" },
  { category: "Starter & Burgers", name: "Gossip Burger", price: "15 €", desc: "La signature. Steak haché, cheddar, salade, œuf, champignons, oignons grillés, ketchup, mayonnaise & frites maison.", image: gossipBurger, align: "left" },
  { category: "Starter & Burgers", name: "Hot-Dog", price: "13 €", desc: "Saucisses de poulet, cheddar, oignons frits, ketchup, moutarde américaine & frites maison.", image: hotdog, align: "right" },
  { category: "Starter & Burgers", name: "Caesar Salade", price: "13 €", desc: "Salade, filet de poulet pané, parmesan, croûtons & sauce Caesar.", image: caesar, align: "left" },
  { category: "À partager", name: "Mozzarella Sticks", price: "8 €", desc: "Bâtonnets de mozzarella panés, dorés, fondants à cœur.", image: mozzaSticks, align: "right" },
  { category: "À partager", name: "Chicken Fingers", price: "8 €", desc: "Aiguillettes de poulet pané, sauce barbecue maison.", image: chickenFingers, align: "left" },
  { category: "À partager", name: "Portion de Frites", price: "6 €", desc: "Frites maison croustillantes. Extra cheddar +1 € · bacon +1 €.", image: frites, align: "right" },

  // NARGUILÉS
  { category: "Narguilés", name: "Chicha Premium", price: "15 €", desc: "Menthe · Pomme · Pomme/Menthe · Hawaï · Love 66 · Mi Amor — tête aluminium. Goût du jour 20 € · Charbon Kaloud, Quasar, Brohood 20 € · Tuyau Freeze +3 €.", image: chicha, align: "left" },

  // COCKTAILS
  { category: "Cocktails", name: "Bora Bora", price: "9 €", desc: "40cl — Fruit de la passion, ananas, framboise. L'évasion tropicale.", image: boraBora, align: "right" },
  { category: "Cocktails", name: "Virgin Mojito", price: "9 €", desc: "40cl — Limonade, citron vert, menthe fraîche, sucre de canne. Le classique frais.", image: virginMojito, align: "left" },
  { category: "Cocktails", name: "Strawberry Mojito", price: "9 €", desc: "40cl — Limonade, sirop de fraise, citron vert, menthe fraîche. Doux et fruité.", image: strawberryMojito, align: "right" },
  { category: "Cocktails", name: "Virgin Mojito Bull", price: "9 €", desc: "40cl — RedBull, citron vert, menthe fraîche, sucre. Pétillant, énergique.", image: mojitoBull, align: "left" },
  { category: "Cocktails", name: "Night Rider", price: "9 €", desc: "40cl — Mangue, ananas, orange, grenadine. Le coucher de soleil en verre.", image: nightRider, align: "right" },
  { category: "Cocktails", name: "Little Red Corvette", price: "9 €", desc: "40cl — Framboise, fraise, fruit de la passion. Intense, vibrant, irrésistible.", image: redCorvette, align: "left" },

  // SODAS & BOISSONS
  { category: "Sodas", name: "Sodas 33cl", price: "5 €", desc: "Coca, Coca Zéro, Coca Cherry, Hawaï, Schweppes Agrum, Schweppes Lemon, Orangina, Sprite, Perrier.", image: sodas, align: "right" },
  { category: "Énergisant", name: "RedBull 25cl", price: "6 €", desc: "Pour ceux qui veulent prolonger la soirée. Givré, intense.", image: redbull, align: "left" },
  { category: "Boissons non gazeuses", name: "Eaux & Jus", price: "5 €", desc: "33cl — Evian, Oasis Tropical, Oasis Pomme-Cassis, Ice Tea Pêche.", image: eauJus, align: "right" },
  { category: "Sirops", name: "Sirop à l'eau", price: "—", desc: "Grenadine, Fraise, Menthe, Pomme Verte, Violette, Melon, Citron, Kiwi, Pêche, Fruit de la Passion, Ananas, Framboise, Banane Verte, Mangue, Poire.", image: sirops, align: "left" },

  // BOISSONS CHAUDES
  { category: "Boissons Chaudes", name: "Thé à la Menthe", price: "dès 5 €", desc: "Magnum 5 € · Théière 2 pers. 10 € · Théière 3 pers. 15 €. Servi avec menthe fraîche.", image: theMenthe, align: "right" },
  { category: "Boissons Chaudes", name: "Café & Cafés Spéciaux", price: "dès 4 €", desc: "Café 4 € · Café Latté 5 € · Café Viennois 5 €. Torréfaction maison.", image: cafe, align: "left" },
  { category: "Boissons Chaudes", name: "Chocolat Chaud", price: "6 €", desc: "Chocolat classique 6 € · Chocolat Viennois 6 €. Onctueux, généreux, chantilly.", image: chocolatChaud, align: "right" },

  // CRÊPES & CHURROS
  { category: "Crêpes & Churros", name: "Churros Sucre Glace", price: "7 €", desc: "Beignets dorés, croustillants, saupoudrés de sucre glace.", image: churrosSucre, align: "left" },
  { category: "Crêpes & Churros", name: "Churros Nutella", price: "8 €", desc: "Nos churros maison nappés de Nutella fondant.", image: churrosNutella, align: "right" },
  { category: "Crêpes & Churros", name: "Crêpe Sucre", price: "7 €", desc: "Pâte fine maison, sucre fin. La simplicité parfaite. Crêpe Nutella 8 €.", image: crepeSucre, align: "left" },
  { category: "Crêpes & Churros", name: "Crêpe Nutella Banane", price: "9 €", desc: "Pâte fine, Nutella, banane fraîche. + glace vanille & chantilly (11 €). Extras +1 € : Kinder Bueno, Schokobons, Oreo, Speculoos.", image: crepeNutellaBanane, align: "right" },

  // DESSERTS
  { category: "Desserts", name: "Fondant au Chocolat", price: "8 €", desc: "Cœur coulant chocolat noir, boule de glace vanille, crème fouettée maison.", image: fondant, align: "left" },
  { category: "Desserts", name: "Tarte Tatin", price: "8 €", desc: "Pommes caramélisées, boule de glace vanille, crème fouettée.", image: tarteTatin, align: "right" },
];

function MenuPage() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleStart = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStarted(true);
      setTransitioning(false);
    }, 1100);
  };

  return (
    <>
      <Navbar />

      {/* Transition voile cinématique entre intro et slides */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 70%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, times: [0, 0.5, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.6em] text-primary/70 mb-3">La Carte</p>
                <p className="font-display text-4xl sm:text-6xl font-black neon-text">Le Gossip</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-dvh w-full overflow-hidden"
          >
            {/* Hero image fullscreen */}
            <motion.img
              src={heroBg}
              alt="Salle du Gossip Lounge"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Overlay sombre + grain */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

            {/* Lignes décoratives */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 w-24 h-px bg-primary origin-center mt-32 sm:mt-40"
            />

            <div className="relative z-10 h-full flex items-center justify-center px-6">
              <div className="text-center max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.55em] text-primary mb-6"
                >
                  Le Gossip Lounge · Vitry-sur-Seine
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="font-display text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9]"
                >
                  <span className="neon-text">La Carte</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5 }}
                  className="mt-8 text-base sm:text-lg text-foreground/85 leading-relaxed max-w-md mx-auto"
                >
                  Burgers signature, cocktails frais, narguilés premium et douceurs maison. Une expérience à savourer, slide après slide.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.75 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStart}
                  className="mt-12 group inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground neon-glow-sm transition-shadow"
                >
                  Explorer notre menu
                  <ChevronDown size={18} className="transition-transform group-hover:translate-y-0.5" />
                </motion.button>

                <Link to="/" className="mt-10 inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
                  <ChevronLeft size={14} /> Retour à l'accueil
                </Link>
              </div>
            </div>

            {/* Bas de page */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase tracking-[0.4em] text-foreground/40">
              {items.length} créations
            </div>
          </motion.section>
        ) : (
          <motion.main
            key="slides"
            ref={containerRef as React.RefObject<HTMLElement>}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="snap-container"
          >
            {items.map((item, i) => (
              <MenuSlide key={i} item={item} index={i} total={items.length} scrollContainer={containerRef} />
            ))}

            <section className="snap-section flex items-center justify-center aurora-bg">
              <div className="relative z-10 text-center px-6">
                <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">Bon appétit</p>
                <h2 className="font-display text-5xl sm:text-7xl font-black"><span className="neon-text">À table.</span></h2>
                <p className="mt-6 text-foreground/80 max-w-md mx-auto">Une table, une chicha, un cocktail — l'équipe vous accueille tous les soirs.</p>
                <Link to="/" hash="contact" className="inline-flex items-center gap-2 mt-10 rounded-full bg-primary px-10 py-4 font-semibold text-primary-foreground neon-glow-sm">
                  Nous contacter
                </Link>
                <button onClick={() => setStarted(false)} className="mx-auto mt-6 text-sm text-foreground/60 hover:text-primary inline-flex items-center gap-2">
                  <ArrowLeft size={14} /> Revenir au début
                </button>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuSlide({
  item,
  index,
  total,
  scrollContainer,
}: {
  item: Item;
  index: number;
  total: number;
  scrollContainer: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainer, target: ref, offset: ["start end", "end start"] });

  // Image fullscreen avec parallax doux + ken burns
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Card : entre du bas, sort vers le haut (rapide)
  const cardY = useTransform(scrollYProgress, [0, 0.45, 1], [60, 0, -60]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);

  // Whoosh transition — voile sombre neutre, plus de filtre bleu
  const veilOpacity = useTransform(scrollYProgress, [0.42, 0.5, 0.58], [0, 0.7, 0]);

  const isRight = item.align === "right";

  return (
    <section ref={ref} className="snap-section">
      {/* Image fullscreen sans aucun overlay de couleur */}
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 will-change-transform">
        <img
          src={item.image}
          alt={item.name}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index === 0 ? "high" : "low"}
          width={1600}
          height={1000}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Vignettage neutre haut/bas pour lisibilité (zéro teinte bleue) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 via-background/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/55 to-transparent" />

      {/* Whoosh neutre */}
      <motion.div
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-30 bg-background"
      />

      {/* Carte menu façon présentation — placée en bas (mobile) ou côté (desktop) */}
      <motion.div
        style={{ y: cardY, opacity: cardOpacity }}
        className={`relative z-10 h-full w-full max-w-7xl mx-auto px-5 sm:px-10 flex items-end md:items-center ${isRight ? "md:justify-end" : "md:justify-start"} pb-10 md:pb-0`}
      >
        <div className="w-full md:w-[440px] lg:w-[500px] matte-card rounded-3xl p-7 sm:p-9 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary">{item.category}</p>
            <p className="text-[10px] tracking-[0.3em] text-foreground/45">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </div>

          <div className="hairline h-px w-full mb-6" />

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-[1] text-foreground">
            {item.name}
          </h2>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-2xl sm:text-3xl font-bold neon-text">{item.price}</span>
          </div>

          <p className="mt-5 text-sm sm:text-base text-foreground/80 leading-relaxed">
            {item.desc}
          </p>

          <div className="mt-7 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/45">À déguster sur place</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Indicateur scroll */}
      {index < total - 1 && (
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-primary/80"
        >
          <ChevronDown size={22} />
        </motion.div>
      )}
    </section>
  );
}
