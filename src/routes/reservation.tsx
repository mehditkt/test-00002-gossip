import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Mail, Phone, User, Users, Send, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import heroImg from "@/assets/hero.jpg";

const RESTAURANT_EMAIL = "contact@legossiplounge.fr"; // sera configuré via PurelyMail

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Réserver une table — Le Gossip Lounge · Vitry-sur-Seine" },
      { name: "description", content: "Réservez votre table au Gossip Lounge, terrasse en bord de Seine à Vitry-sur-Seine. Formulaire rapide, confirmation par e-mail." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: ReservationPage,
});

type Form = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  date: string;
  heure: string;
  personnes: number;
  occasion: string;
  message: string;
};

const HOURS = Array.from({ length: 17 }, (_, i) => {
  // 18:00 → 02:00 par tranche de 30 min
  const total = 18 * 60 + i * 30;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
});

function ReservationPage() {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<Form>({
    prenom: "", nom: "", email: "", telephone: "",
    date: today, heure: "20:00", personnes: 2, occasion: "", message: "",
  });

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  // Sauvegarde locale (localStorage) + ouverture du client mail
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.prenom || !form.nom || !form.email || !form.telephone || !form.date || !form.heure) return;

    const entry = { ...form, createdAt: new Date().toISOString() };
    try {
      const list = JSON.parse(localStorage.getItem("gossip_reservations") || "[]");
      list.push(entry);
      localStorage.setItem("gossip_reservations", JSON.stringify(list));
    } catch { /* noop */ }

    const dateFr = new Date(form.date).toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    const subject = `Nouvelle réservation — ${form.prenom} ${form.nom} · ${dateFr} ${form.heure}`;
    const body =
`Bonjour,

Une nouvelle demande de réservation a été enregistrée sur le site Le Gossip Lounge.

— CLIENT —
Prénom   : ${form.prenom}
Nom      : ${form.nom}
E-mail   : ${form.email}
Téléphone: ${form.telephone}

— RÉSERVATION —
Date     : ${dateFr}
Heure    : ${form.heure}
Personnes: ${form.personnes}
Occasion : ${form.occasion || "—"}

— MESSAGE —
${form.message || "—"}

Merci de confirmer cette réservation auprès du client.

— Envoyé depuis le site legossiplounge.fr —`;

    const mailto = `mailto:${RESTAURANT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-dvh">
        {/* Décor */}
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
          <div className="absolute inset-0 aurora-bg opacity-40" />
          <div className="absolute inset-0 grain-overlay" />
        </div>

        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-28 pb-20">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-4">Réservation</p>
            <h1 className="font-display text-5xl sm:text-7xl font-black leading-[0.95]">
              Une table au <span className="neon-text">Gossip.</span>
            </h1>
            <p className="mt-5 text-foreground/75 max-w-xl">
              Réservez en quelques secondes. Nous vous confirmons votre table par e-mail ou par téléphone dans les meilleurs délais.
            </p>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-10 matte-card rounded-3xl p-8 sm:p-10 text-center"
            >
              <CheckCircle2 size={48} className="mx-auto text-primary mb-5" />
              <h2 className="font-display text-3xl font-black">Demande envoyée</h2>
              <p className="mt-3 text-foreground/75 max-w-md mx-auto">
                Votre application e-mail s'est ouverte avec votre demande pré-remplie. Envoyez-la pour finaliser votre réservation —
                nous reviendrons vers vous très vite.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => setSent(false)} className="rounded-full matte-chip px-6 py-3 text-sm hover:border-primary">
                  Nouvelle réservation
                </button>
                <Link to="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground neon-glow-sm">
                  Retour à l'accueil
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="mt-10 matte-card rounded-3xl p-6 sm:p-8 grid gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={User} label="Prénom" required value={form.prenom} onChange={(v) => update("prenom", v)} />
                <Field icon={User} label="Nom" required value={form.nom} onChange={(v) => update("nom", v)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={Mail} type="email" label="E-mail" required value={form.email} onChange={(v) => update("email", v)} />
                <Field icon={Phone} type="tel" label="Téléphone" required value={form.telephone} onChange={(v) => update("telephone", v)} />
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                <Field icon={CalendarDays} type="date" label="Date" required min={today} value={form.date} onChange={(v) => update("date", v)} />
                <SelectField icon={Clock} label="Heure" required value={form.heure} onChange={(v) => update("heure", v)}
                  options={HOURS.map((h) => ({ value: h, label: h }))} />
                <SelectField icon={Users} label="Personnes" required value={String(form.personnes)} onChange={(v) => update("personnes", Number(v))}
                  options={Array.from({ length: 19 }, (_, i) => i + 1).map((n) => ({ value: String(n), label: `${n} ${n > 1 ? "personnes" : "personne"}` }))} />
              </div>
              <Field label="Occasion (optionnel)" placeholder="Anniversaire, soirée privée…" value={form.occasion} onChange={(v) => update("occasion", v)} />
              <div>
                <label className="block text-[10px] uppercase tracking-[0.35em] text-foreground/55 mb-2">Message (optionnel)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                  placeholder="Une demande particulière, allergies, terrasse souhaitée…"
                  className="w-full rounded-2xl bg-input/60 border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button type="submit"
                className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground neon-glow-sm transition-transform hover:scale-[1.02]">
                <Send size={16} /> Envoyer la demande
              </button>
              <p className="text-[11px] text-foreground/50 text-center">
                Vos informations sont enregistrées localement puis transmises à l'équipe du Gossip par e-mail.
              </p>
            </motion.form>
          )}
        </div>
      </main>
    </>
  );
}

function Field({
  icon: Icon, label, value, onChange, type = "text", required, placeholder, min,
}: {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string; min?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.35em] text-foreground/55 mb-2">{label}{required && " *"}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/80" />}
        <input
          type={type} value={value} required={required} placeholder={placeholder} min={min}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl bg-input/60 border border-border ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 text-sm outline-none focus:border-primary transition-colors`}
        />
      </div>
    </div>
  );
}
function SelectField({
  icon: Icon, label, value, onChange, options, required,
}: {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.35em] text-foreground/55 mb-2">{label}{required && " *"}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/80 pointer-events-none" />}
        <select
          value={value} required={required}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-2xl bg-input/60 border border-border ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 text-sm outline-none focus:border-primary transition-colors`}
        >
          {options.map((o) => <option key={o.value} value={o.value} className="bg-background">{o.label}</option>)}
        </select>
      </div>
    </div>
  );
}
