import Image from "next/image";
import { MARQUEE_ITEMS } from "@/lib/figma-data";

const REPEATED_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export function MarqueeRibbon() {
  return (
    <div
      className="w-full bg-[#E8BF96] text-black h-[71.25px] flex items-center overflow-hidden select-none"
      aria-label="Salon specialties"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div
            key={half}
            aria-hidden={half === 1 ? "true" : undefined}
            className="flex shrink-0 items-center gap-[13.5px] pr-[13.5px] whitespace-nowrap"
          >
            {REPEATED_ITEMS.map((item, idx) => (
              <div
                key={`${half}-${idx}-${item}`}
                className="flex items-center gap-[13.5px]"
              >
                <span className="font-serif font-light text-[28px] sm:text-[36px] leading-[37.5px] text-black tracking-normal">
                  {item}
                </span>
                <Image
                  src="/icons/star.svg"
                  alt=""
                  width={31}
                  height={31}
                  className="w-[24px] h-[24px] sm:w-[30.75px] sm:h-[30.75px] shrink-0"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
