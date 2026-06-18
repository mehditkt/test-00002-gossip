import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import logoUrl from "@/assets/logo-gossip.png?url";

const links = [
  { to: "/", hash: "accueil", label: "Accueil" },
  { to: "/", hash: "franchise", label: "Le Lieu" },
  { to: "/", hash: "carte", label: "Carte" },
  { to: "/", hash: "menu", label: "Menu" },
  { to: "/", hash: "terrasse", label: "Terrasse" },
  { to: "/", hash: "position", label: "Position" },
  { to: "/", hash: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string, hash: string) => {
    setOpen(false);
    if (to === "/" && hash && router.state.location.pathname === "/") {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl matte-card px-4 py-2.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logoUrl}
            alt="Gossip Lounge"
            width={40}
            height={40}
            decoding="async"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-lg sm:text-xl font-bold tracking-[0.18em] text-foreground">GOSSIP</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                hash={l.hash || undefined}
                onClick={(e) => handleClick(e, l.to, l.hash)}
                className="text-foreground/70 transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/reservation"
          onClick={() => setOpen(false)}
          className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground neon-glow-sm transition-transform hover:scale-[1.03]"
        >
          Réserver
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl matte-card p-5">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash || undefined}
                  onClick={(e) => handleClick(e, l.to, l.hash)}
                  className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/reservation"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Réserver une table
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
