import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Le Gossip Lounge | Meilleure Chicha Paris & 94, Salon de Thé à Vitry-sur-Seine" },
      { name: "description", content: "Le Gossip Lounge est le meilleur salon de thé et bar à chicha de Paris et du Val-de-Marne (94). Terrasse, cocktails signature, narguilé premium et ambiance lounge à Vitry-sur-Seine." },
      { name: "keywords", content: "chicha paris, chicha 94, meilleur chicha, salon de the, bar a chicha, lounge paris, narguile, chicha vitry sur seine, cocktail paris, terrasse chicha, restaurant chicha" },
      { property: "og:site_name", content: "Le Gossip Lounge" },
      { property: "og:title", content: "Le Gossip Lounge | Meilleure Chicha Paris & 94" },
      { property: "og:description", content: "Salon de thé et bar à chicha premium au bord de l'eau à Vitry-sur-Seine (94). Cocktails, burgers et narguilés de luxe." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://legossiplounge.fr" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Le Gossip Lounge | Chicha & Salon de Thé" },
      { name: "twitter:description", content: "La référence Lounge & Chicha en région parisienne (94)." },
      { name: "theme-color", content: "#F9C41C" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800;900&family=Lexend+Tera:wght@400;600;800&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "Le Gossip Lounge",
    "image": "https://legossiplounge.fr/assets/hero-remastered.png",
    "@id": "https://legossiplounge.fr",
    "url": "https://legossiplounge.fr",
    "telephone": "+33787944067",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4 Quai Jules Guesde",
      "addressLocality": "Vitry-sur-Seine",
      "postalCode": "94400",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8055,
      "longitude": 2.4048
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "18:00",
      "closes": "02:00"
    },
    "sameAs": [
      "https://instagram.com/legossip"
    ],
    "servesCuisine": "Burgers, Cocktails, Chicha",
    "priceRange": "€€",
    "description": "Le Gossip Lounge est le meilleur salon de thé et bar à chicha du 94 (Val-de-Marne) et de Paris. Ambiance lounge estivale, narguilés premium et cocktails signature."
  };

  return (
    <html lang="fr">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
