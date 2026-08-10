import { Facebook, MessageCircle } from "lucide-react";
import type { WatchPlatform } from "@/lib/types";

export function PlatformIcon({ platform }: { platform: WatchPlatform }) {
  const Icon = platform === "facebook" ? Facebook : MessageCircle;
  return (
    <span
      className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
        platform === "facebook"
          ? "bg-blue-500/12 text-blue-300"
          : "bg-orange-500/12 text-orange-300"
      }`}
    >
      <Icon className="size-3.5" strokeWidth={2} />
    </span>
  );
}
