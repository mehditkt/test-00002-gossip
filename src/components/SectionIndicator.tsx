import { useEffect, useState } from "react";

interface Props {
  sectionIds: string[];
  containerRef: React.RefObject<HTMLElement | null>;
}

export function SectionIndicator({ sectionIds, containerRef }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const top = container.scrollTop;
      const h = container.clientHeight;
      const idx = Math.round(top / h);
      setActive(Math.min(idx, sectionIds.length - 1));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [containerRef, sectionIds.length]);

  const goTo = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: i * container.clientHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3">
      {sectionIds.map((id, i) => (
        <button
          key={id}
          aria-label={`Aller à la section ${id}`}
          onClick={() => goTo(i)}
          className={`block rounded-full transition-all duration-500 ${
            active === i
              ? "h-10 w-2.5 bg-primary neon-glow-sm"
              : "h-2.5 w-2.5 bg-foreground/30 hover:bg-foreground/60"
          }`}
        />
      ))}
    </div>
  );
}
