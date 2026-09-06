import { Droplet, Wind, Zap, Home, Thermometer, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

/* Illustrative logo marks, not real businesses — deliberately generic/
 * fictional so this reads as "the kind of team this is built for" and never
 * as a false claim that a specific company is a customer. Rendered in one
 * flat ash tone throughout (no color, no raster image) rather than a
 * grayscale filter on a photo/logo asset — same monochrome effect, none of
 * the paint issues a CSS filter caused here before (see git history). */
type TradeLogo = { name: string; icon: LucideIcon };

const LOGOS: TradeLogo[] = [
  { name: "Ace Plumbing Co.", icon: Droplet },
  { name: "Coldwell HVAC", icon: Wind },
  { name: "Brightline Electric", icon: Zap },
  { name: "Summit Roofing", icon: Home },
  { name: "Reliable Heating & Air", icon: Thermometer },
  { name: "Precision Electrical", icon: Wrench },
];

function LogoMark({ name, icon: Icon }: TradeLogo) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 px-6">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-ash-dim/30">
        <Icon className="size-4.5 text-ash-dim" strokeWidth={1.6} />
      </span>
      <span className="whitespace-nowrap text-base font-bold tracking-tight text-ash-dim">
        {name}
      </span>
    </span>
  );
}

export function TradeLogos() {
  return (
    <section className="relative py-14 sm:py-16">
      <Reveal
        className="mx-auto max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="flex w-max animate-marquee items-center">
          {/* Logo list rendered twice back-to-back — the marquee animates
              exactly one copy's width (translateX -50%), so the loop point
              is invisible instead of jump-cutting. */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <LogoMark key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
