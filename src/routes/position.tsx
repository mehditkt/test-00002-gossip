import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Phone, Instagram, Clock, Navigation } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const MAP_EMBED = "https://www.google.com/maps?q=Le+Gossip+Lounge+4+Quai+Jules+Guesde+Vitry-sur-Seine&z=16&output=embed";
const EXACT_ADDRESS = "4 Quai Jules Guesde, 94400 Vitry-sur-Seine, France";
const GOOGLE_MAPS_LINK = "https://goo.gl/maps/QG2T2uVwM5X2";

export const Route = createFileRoute("/position")({
  head: () => ({
    meta: [
      { title: "Nous trouver — Le Gossip Lounge" },
    ],
  }),
  component: PositionPage,
});

function PositionPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-dvh bg-background pt-28 pb-20">
        <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-foreground/70 hover:text-primary transition-colors mb-10">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>

          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">Position</p>
            <h1 className="font-display text-5xl sm:text-7xl font-black leading-tight text-foreground">
              Où nous <span className="neon-text">trouver</span>.
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-8">
              <div className="matte-card rounded-[2rem] p-8 sm:p-10 shadow-xl border border-black/5">
                <div className="flex items-start gap-5">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black mb-2">Adresse Exacte</h3>
                    <p className="text-lg font-medium text-foreground/80 leading-relaxed mb-4">
                      {EXACT_ADDRESS}
                    </p>
                    <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
                      <Navigation size={16} /> Itinéraire Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="matte-card rounded-3xl p-8 shadow-lg text-center">
                  <Clock size={28} className="text-primary mx-auto mb-4" />
                  <h4 className="font-display text-xl font-bold mb-2">Horaires</h4>
                  <p className="font-medium text-foreground/70">Ouvert 7j/7<br />de 18h à 02h</p>
                </div>
                <div className="matte-card rounded-3xl p-8 shadow-lg text-center">
                  <Phone size={28} className="text-primary mx-auto mb-4" />
                  <h4 className="font-display text-xl font-bold mb-2">Téléphone</h4>
                  <p className="font-medium text-foreground/70">07 87 94 40 67</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
              <iframe 
                title="Carte Le Gossip Lounge" 
                src={MAP_EMBED} 
                className="absolute inset-0 w-full h-full" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
