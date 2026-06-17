import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Instagram, Clock, ChevronDown, Star, Leaf, BookOpen, ArrowRight, X, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import heroImg from "@/assets/hero.jpg";
import franchiseImg from "@/assets/franchise.jpg";
import terrasseImg from "@/assets/terrasse.jpg";
import carteBook from "@/assets/carte-book.jpg";
import carteBg from "@/assets/carte-bg.jpg";
import { categories, type Category, type Product } from "@/lib/menu-data";

const MENU_FOOD = "/images/menu-food.jpg";
const MENU_DRINKS = "/images/menu-drinks.jpg";
const TERRASSE_1 = "/images/terrasse-1.jpg";
const TERRASSE_2 = "/images/terrasse-2.jpg";

const SITE_NAME = "Le Gossip Lounge";
const SITE_DESC = "Lounge & chicha en bord de Seine à Vitry-sur-Seine — cocktails signature, narguilés premium, burgers gourmets, milkshakes et desserts maison. Terrasse intimiste au fil de l'eau.";
const SITE_URL = "/";
const ADDRESS = "4 Quai Jules Guesde, 94400 Vitry-sur-Seine";
const PHONE = "07 87 94 40 67";
const PHONE_TEL = "+33787944067";
const MAP_EMBED = "https://www.google.com/maps?q=Le+Gossip+Lounge+4+Quai+Jules+Guesde+Vitry-sur-Seine&z=16&output=embed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Le Gossip Lounge — Chicha & Cocktails sur la Seine · Vitry-sur-Seine" },
      { name: "description", content: SITE_DESC },
      { name: "keywords", content: "lounge vitry, chicha vitry-sur-seine, narguilé paris, terrasse seine, bar à cocktails, shisha bar, burger gourmet, milkshake, gossip lounge" },
      { property: "og:title", content: "Le Gossip Lounge — Chicha & Cocktails sur la Seine" },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Le Gossip Lounge — Vitry-sur-Seine" },
      { name: "twitter:description", content: SITE_DESC },
      { name: "theme-color", content: "#1aa388" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: SITE_NAME,
        description: SITE_DESC,
        servesCuisine: ["Cocktails", "Chicha", "Burgers", "Desserts", "Milkshakes"],
        priceRange: "€€",
        telephone: "+33 7 87 94 40 67",
        address: {
          "@type": "PostalAddress",
          streetAddress: "4 Quai Jules Guesde",
          postalCode: "94400",
          addressLocality: "Vitry-sur-Seine",
          addressCountry: "FR",
        },
        geo: { "@type": "GeoCoordinates", latitude: 48.8095, longitude: 2.3878 },
        acceptsReservations: true,
        openingHours: "Mo-Su 18:00-02:00",
        sameAs: ["https://instagram.com/legossip"],
      }),
    }],
  }),
  component: Home,
});

function Slide({
  id, scrollContainer, children, bg, alt, parallax = true, eager = false,
}: {
  id: string;
  scrollContainer: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  bg: string;
  alt: string;
  parallax?: boolean;
  eager?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainer, target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-6%", "6%"] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], parallax ? [1.08, 1, 1.08] : [1, 1, 1]);
  const veil = useTransform(scrollYProgress, [0.42, 0.5, 0.58], [0, 0.18, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45, 1], [40, 0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.78, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} id={id} className="snap-section">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img src={bg} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : "low"} width={1920} height={1080} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/20" />
      </motion.div>
      <motion.div style={{ opacity: veil }} className="pointer-events-none absolute inset-0 z-30 bg-background" />
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 h-full w-full">
        {children}
      </motion.div>
    </section>
  );
}

function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [carteOpen, setCarteOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeProduct, setActiveProduct] = useState<{ product: Product; category: Category } | null>(null);

  return (
    <>
      <Navbar />

      <main ref={containerRef} className="snap-container">
        {/* HERO */}
        <section id="accueil" className="snap-section">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Terrasse Le Gossip Lounge en bord de Seine" width={1920} height={1080} decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/75" />
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="text-[11px] sm:text-xs uppercase tracking-[0.55em] text-primary mb-6">
              Vitry-sur-Seine · Bord de Seine · Lounge & Chicha
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
              className="font-display text-6xl sm:text-8xl md:text-[10rem] font-black leading-none">
              <span className="neon-text">LE GOSSIP</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.4 }} className="hairline h-px w-32 mt-8" />
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 max-w-xl text-base sm:text-lg text-foreground/80">
              Une terrasse intimiste au fil de l'eau. Cocktails, narguilés premium, burgers signature et desserts maison.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="mt-8">
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground neon-glow-sm transition-transform hover:scale-[1.04]"
              >
                Réserver <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary/70 text-xs uppercase tracking-[0.4em] flex flex-col items-center gap-2">
            Scroll <ChevronDown size={20} />
          </motion.div>
        </section>

        {/* LE LIEU */}
        <Slide id="franchise" scrollContainer={containerRef} bg={franchiseImg} alt="Ambiance lounge Gossip en bord de Seine">
          <div className="mx-auto max-w-5xl h-full px-6 sm:px-10 flex flex-col justify-center gap-0">
            <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-4">Le Lieu</p>
            <h2 className="font-display text-3xl sm:text-5xl font-black leading-[0.95] max-w-2xl">
              <span className="neon-text">Le Gossip,</span> votre escale au bord de l'eau.
            </h2>
            <p className="mt-5 max-w-xl text-sm sm:text-base text-foreground/85 leading-relaxed">
              Niché sur le quai Jules Guesde, Le Gossip est un lounge intimiste pensé comme un refuge nocturne :
              terrasse végétale, banquettes profondes, la Seine en bande-son. On y vient pour une chicha,
              un cocktail au coucher du soleil — et l'on y reste.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-2xl">
              {[
                { icon: Leaf, label: "Terrasse végétale" },
                { icon: Clock, label: "18h → 2h, 7j/7" },
                { icon: Star, label: "Narguilés premium" },
                { icon: MapPin, label: "Bord de Seine" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="matte-chip rounded-xl px-3 py-2.5 flex items-center gap-2">
                  <Icon size={14} className="text-primary shrink-0" />
                  <span className="text-xs text-foreground/85">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 max-w-2xl">
              <Review name="Yanis K." text="L'endroit parfait pour une soirée chicha tranquille avec vue. Service au top." />
              <Review name="Léa M." text="Le Gossip Burger est une dinguerie. La terrasse côté Seine, juste magique l'été." />
            </div>
          </div>
        </Slide>

        {/* CARTE — livre ouvert avec les 2 photos collées sur les pages */}
        <section id="carte" className="snap-section">
          <div className="absolute inset-0">
            <img src={carteBook} alt="Carte du Gossip Lounge posée sur table" loading="lazy" decoding="async" width={1920} height={1080} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/75" />
          </div>

          {/* Les 2 menus collés sur les pages du livre (object-contain pour lisibilité) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none pt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-[min(92vw,1000px)] aspect-[16/11] -mt-4"
            >
              <div className="absolute left-[4%] top-[4%] w-[44%] h-[92%] rotate-[-2.5deg] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-black/30 rounded-md overflow-hidden bg-[#fff7e6]">
                <img src={MENU_FOOD} alt="Carte burgers & desserts" className="h-full w-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="absolute right-[4%] top-[4%] w-[44%] h-[92%] rotate-[2.5deg] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-black/30 rounded-md overflow-hidden bg-[#fff7e6]">
                <img src={MENU_DRINKS} alt="Carte cocktails, narguilés & boissons" className="h-full w-full object-contain" loading="lazy" decoding="async" />
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 pb-10 sm:pb-14 px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-4">La Carte</p>
              <h2 className="font-display text-3xl sm:text-5xl font-black leading-[0.95]">
                Une carte <span className="neon-text">pensée comme une lettre</span> à la nuit.
              </h2>
              <button
                onClick={() => setCarteOpen(true)}
                className="group inline-flex items-center gap-3 mt-6 rounded-full bg-primary px-9 py-4 font-semibold text-primary-foreground neon-glow-sm transition-transform hover:scale-[1.03]"
              >
                <BookOpen size={18} />
                Explorer la carte
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* MENU */}
        <section id="menu" className="snap-section overflow-y-auto">
          <div className="absolute inset-0 aurora-bg" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 min-h-full px-5 sm:px-10 pt-24 pb-16 mx-auto max-w-7xl">
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-3">Le Menu</p>
              <h2 className="font-display text-4xl sm:text-6xl font-black leading-[0.95]">
                Choisissez une <span className="neon-text">catégorie</span>.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden matte-card text-left"
                >
                  <img src={cat.cover} alt={cat.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-primary mb-1.5">{cat.items.length} produits</p>
                    <h3 className="font-display text-xl sm:text-2xl font-black leading-tight">{cat.name}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* TERRASSE */}
        <Slide id="terrasse" scrollContainer={containerRef} bg={terrasseImg} alt="Terrasse du Gossip Lounge au bord de la Seine">
          <div className="mx-auto max-w-5xl h-full px-6 sm:px-10 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-4">La Terrasse</p>
            <h2 className="font-display text-3xl sm:text-5xl font-black leading-[0.95] max-w-2xl">
              La Seine à vos <span className="neon-text">pieds.</span>
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-2.5 max-w-sm">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.75)] ring-1 ring-white/15">
                <img src={TERRASSE_1} alt="Terrasse Gossip Lounge" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.75)] ring-1 ring-white/15">
                <img src={TERRASSE_2} alt="Terrasse Gossip Lounge — vue 2" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </Slide>

        {/* ACCÈS */}
        <section id="trouver" className="snap-section">
          <div className="absolute inset-0 aurora-bg" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 h-full w-full mx-auto max-w-7xl px-6 sm:px-10 pt-24 pb-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-5">Où nous trouver</p>
              <h2 className="font-display text-5xl sm:text-6xl font-black leading-[0.95]">
                <span className="neon-text">Sur le quai,</span> côté rivière.
              </h2>
              <div className="mt-8 space-y-3 max-w-md">
                <Info icon={MapPin} title="Adresse" value={ADDRESS} />
                <Info icon={Phone} title="Téléphone" value={PHONE} href={`tel:${PHONE_TEL}`} />
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden matte-card aspect-[4/5] sm:aspect-[5/4] lg:aspect-square">
              <iframe title="Carte — Le Gossip Lounge" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full grayscale-[0.55] contrast-[0.95] brightness-[0.55]" />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="snap-section flex items-center">
          <div className="absolute inset-0 aurora-bg" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 w-full text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.7 }}>
              <h2 className="font-display text-5xl sm:text-7xl font-black">Rejoignez le <span className="neon-text">Gossip</span></h2>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <ContactCard icon={Phone} label="Appelez" value={PHONE} href={`tel:${PHONE_TEL}`} />
                <ContactCard icon={Instagram} label="Suivez" value="@legossip" href="https://instagram.com/legossip" external />
                <ContactCard icon={MapPin} label="Adresse" value={ADDRESS} href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} external />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* OVERLAY : Carte */}
      <AnimatePresence>
        {carteOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] overflow-y-auto bg-background">
            <div className="absolute inset-0">
              <img src={carteBg} alt="" className="h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-background/55" />
            </div>
            <button onClick={() => setCarteOpen(false)} className="fixed top-5 right-5 z-10 matte-card rounded-full p-3"><X size={18} /></button>
            <div className="relative z-[1] min-h-dvh flex flex-col items-center justify-start px-4 sm:px-8 py-20">
              <div className="text-center mb-10">
                <h3 className="font-display text-4xl sm:text-6xl font-black"><span className="neon-text">Gossip Lounge</span></h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 max-w-6xl w-full">
                {[MENU_FOOD, MENU_DRINKS].map((src, i) => (
                  <motion.div key={i} className="relative aspect-[1/1.414] rounded-md overflow-hidden shadow-2xl ring-1 ring-white/15 bg-[#fff7e6]">
                    <img src={src} alt="Menu" className="absolute inset-0 h-full w-full object-contain" />
                  </motion.div>
                ))}
              </div>
                  setCarteOpen(false);
                  setTimeout(() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }), 250);
                }}
                className="mt-12 inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 font-semibold text-primary-foreground neon-glow-sm transition-transform hover:scale-[1.03]"
              >
                Voir les catégories <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== OVERLAY : Liste produits d'une catégorie ===== */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[85] overflow-y-auto bg-background"
          >
            <div className="absolute inset-0">
              <img src={activeCategory.cover} alt="" className="h-full w-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/95 to-background" />
              <div className="absolute inset-0 grain-overlay" />
            </div>

            <div className="relative z-[1] mx-auto max-w-5xl px-5 sm:px-8 py-20">
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft size={16} /> Toutes les catégories
              </button>

              <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="mb-10">
                <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-3">{activeCategory.items.length} produits</p>
                <h3 className="font-display text-5xl sm:text-7xl font-black leading-[0.9]">
                  <span className="neon-text">{activeCategory.name}</span>
                </h3>
                <p className="mt-3 text-foreground/70">{activeCategory.tagline}</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCategory.items.map((p, i) => (
                  <motion.button
                    key={p.name + i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.06 * i }}
                    onClick={() => setActiveProduct({ product: p, category: activeCategory })}
                    whileHover={{ y: -3 }}
                    className="group matte-card rounded-2xl overflow-hidden text-left flex"
                  >
                    <div className="relative w-28 sm:w-36 shrink-0 overflow-hidden">
                      <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display text-lg sm:text-xl font-bold leading-tight">{p.name}</h4>
                        <span className="font-display text-base sm:text-lg font-bold neon-text whitespace-nowrap">{p.price}</span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-3">{p.desc}</p>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-primary inline-flex items-center gap-1">
                        Voir <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== OVERLAY : Détail produit (présentation full-screen) ===== */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90]"
          >
            <motion.img
              key={activeProduct.product.image}
              src={activeProduct.product.image}
              alt={activeProduct.product.name}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent" />

            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-5 right-5 z-10 matte-card rounded-full p-3 hover:border-primary transition-colors"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary matte-chip rounded-full px-4 py-2"
            >
              <ArrowLeft size={14} /> {activeProduct.category.name}
            </button>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-10 md:flex md:justify-end"
            >
              <div className="w-full md:w-[500px] matte-card rounded-3xl p-7 sm:p-9 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.7)]">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-4">{activeProduct.category.name}</p>
                <div className="hairline h-px w-full mb-6" />
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-[1]">{activeProduct.product.name}</h2>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-2xl sm:text-3xl font-bold neon-text">{activeProduct.product.price}</span>
                </div>
                <p className="mt-5 text-sm sm:text-base text-foreground/85 leading-relaxed">{activeProduct.product.desc}</p>
                <div className="mt-7 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/45">À déguster sur place</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Chip({ icon: Icon, text }: { icon: React.ComponentType<{ size?: number; className?: string }>; text: string }) {
  return (
    <span className="matte-chip rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm text-foreground/85">
      <Icon size={14} className="text-primary" /> {text}
    </span>
  );
}
function Info({ icon: Icon, title, value, href }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; value: string; href?: string }) {
  const inner = (
    <div className="matte-card rounded-2xl px-5 py-4 flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
        <Icon size={18} />
      </div>
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/55">{title}</p>
        <p className="font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-90 transition-opacity">{inner}</a> : inner;
}
function ContactCard({ icon: Icon, label, value, href, external }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group matte-card rounded-2xl p-6 hover:border-primary transition-all">
      <Icon className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
      <p className="text-xs uppercase tracking-widest text-foreground/60">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </a>
  );
}
function Review({ name, text }: { name: string; text: string }) {
  return (
    <div className="matte-card rounded-2xl p-5 max-w-sm">
      <div className="flex gap-1 mb-2 text-primary">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
      </div>
      <p className="text-sm text-foreground/85 italic leading-relaxed">"{text}"</p>
      <p className="mt-3 text-xs text-foreground/55">— {name}</p>
    </div>
  );
}
