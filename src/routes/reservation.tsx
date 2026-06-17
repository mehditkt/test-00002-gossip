import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Mail, Phone, User, Users, Send, CheckCircle2, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import terrasseImg from "@/assets/terrasse-tentes.jpg";

const RESTAURANT_EMAIL = "contact@legossiplounge.fr";

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
        {/* Full-bleed background */}
        <div className="absolute inset-0 -z-10">
          <img src={terrasseImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/92 via-[#0f1412]/88 to-[#0a0a0a]/95" />
        </div>

        <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-28 pb-20">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-10">
            <ArrowLeft size={15} /> Retour
          </Link>

          {/* Two-column layout: left = info, right = form */}
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-start">

            {/* Left column — branding */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                <Sparkles size={14} className="text-primary/60" />
              </div>

              <p className="text-[10px] uppercase tracking-[0.6em] text-primary/80 mb-4">Réservation</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.92]">
                Votre soirée<br />au <span className="neon-text">Gossip.</span>
              </h1>
              <p className="mt-6 text-foreground/55 text-sm leading-relaxed max-w-sm">
                Remplissez le formulaire ci-contre et notre équipe vous confirmera votre table par e-mail ou téléphone sous 24h.
              </p>

              {/* Quick info pills */}
              <div className="mt-8 space-y-2.5">
                <div className="flex items-center gap-3 text-xs text-foreground/50">
                  <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Clock size={12} className="text-primary/70" />
                  </div>
                  <span>18h — 02h, 7j/7</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground/50">
                  <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Phone size={12} className="text-primary/70" />
                  </div>
                  <span>07 87 94 40 67</span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              </div>
            </motion.div>

            {/* Right column — form card */}
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-[28px] bg-white/[0.03] border border-white/[0.06] backdrop-blur-md p-8 sm:p-10 text-center"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={28} className="text-primary" />
                </div>
                <h2 className="font-display text-2xl font-black">Demande envoyée</h2>
                <p className="mt-3 text-foreground/55 text-sm max-w-sm mx-auto leading-relaxed">
                  Votre application e-mail s'est ouverte avec votre demande pré-remplie. Envoyez-la pour finaliser — nous reviendrons vers vous très vite.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={() => setSent(false)}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm text-foreground/70 hover:border-primary/30 transition-colors">
                    Nouvelle réservation
                  </button>
                  <Link to="/"
                    className="rounded-2xl bg-primary/90 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary transition-colors">
                    Retour à l'accueil
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                onSubmit={handleSubmit}
                className="rounded-[28px] bg-white/[0.025] border border-white/[0.06] backdrop-blur-md p-6 sm:p-8 space-y-5"
              >
                {/* Identity */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field icon={User} label="Prénom" required value={form.prenom} onChange={(v) => update("prenom", v)} />
                  <Field icon={User} label="Nom" required value={form.nom} onChange={(v) => update("nom", v)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field icon={Mail} type="email" label="E-mail" required value={form.email} onChange={(v) => update("email", v)} />
                  <Field icon={Phone} type="tel" label="Téléphone" required value={form.telephone} onChange={(v) => update("telephone", v)} />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                {/* Date / time / guests */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field icon={CalendarDays} type="date" label="Date" required min={today} value={form.date} onChange={(v) => update("date", v)} />
                  <SelectField icon={Clock} label="Heure" required value={form.heure} onChange={(v) => update("heure", v)}
                    options={HOURS.map((h) => ({ value: h, label: h }))} />
                  <SelectField icon={Users} label="Personnes" required value={String(form.personnes)} onChange={(v) => update("personnes", Number(v))}
                    options={Array.from({ length: 19 }, (_, i) => i + 1).map((n) => ({ value: String(n), label: `${n} ${n > 1 ? "pers." : "pers."}` }))} />
                </div>

                <Field label="Occasion" placeholder="Anniversaire, soirée privée…" value={form.occasion} onChange={(v) => update("occasion", v)} />

                {/* Message */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={3}
                    placeholder="Demande particulière, allergies, terrasse souhaitée…"
                    className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.07] px-4 py-3 text-sm outline-none placeholder:text-foreground/25 focus:border-primary/40 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button type="submit"
                  className="w-full flex items-center justify-center gap-3 rounded-2xl bg-primary/90 hover:bg-primary px-6 py-4 font-semibold text-primary-foreground transition-colors">
                  <Send size={15} /> Envoyer la demande
                </button>

                <p className="text-[10px] text-foreground/30 text-center pt-1">
                  Vos informations sont transmises par e-mail à l'équipe du Gossip.
                </p>
              </motion.form>
            )}
          </div>
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
      <label className="block text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-2">{label}{required && " *"}</label>
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" />}
        <input
          type={type} value={value} required={required} placeholder={placeholder} min={min}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl bg-white/[0.03] border border-white/[0.07] ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 text-sm outline-none placeholder:text-foreground/25 focus:border-primary/40 transition-colors`}
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
      <label className="block text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-2">{label}{required && " *"}</label>
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" />}
        <select
          value={value} required={required}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-2xl bg-white/[0.03] border border-white/[0.07] ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 text-sm outline-none placeholder:text-foreground/25 focus:border-primary/40 transition-colors`}
        >
          {options.map((o) => <option key={o.value} value={o.value} className="bg-[#111]">{o.label}</option>)}
        </select>
      </div>
    </div>
  );
}
