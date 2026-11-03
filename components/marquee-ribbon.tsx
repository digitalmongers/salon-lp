import Image from "next/image";
import { MARQUEE_ITEMS } from "@/lib/figma-data";

export function MarqueeRibbon() {
  return (
    <div
      className="w-full bg-[#E8BF96] text-black h-[71.25px] flex items-center overflow-hidden select-none"
      aria-label="Salon specialties"
    >
      <div className="mx-auto flex items-center justify-center gap-[13.5px] whitespace-nowrap px-4 min-w-max">
        {[0, 1].map((pass) => (
          <div
            key={pass}
            className={
              pass === 1
                ? "hidden 2xl:flex items-center gap-[13.5px]"
                : "flex items-center gap-[13.5px]"
            }
          >
            {pass === 1 && (
              <Image
                src="/icons/star.svg"
                alt=""
                width={31}
                height={31}
                className="w-[30.75px] h-[30.75px] shrink-0"
              />
            )}
            {MARQUEE_ITEMS.map((item, idx) => (
              <div key={`${pass}-${item}`} className="flex items-center gap-[13.5px]">
                <span className="font-serif font-light text-[28px] sm:text-[36px] leading-[37.5px] text-black tracking-normal">
                  {item}
                </span>
                {idx < MARQUEE_ITEMS.length - 1 && (
                  <Image
                    src="/icons/star.svg"
                    alt=""
                    width={31}
                    height={31}
                    className="w-[24px] h-[24px] sm:w-[30.75px] sm:h-[30.75px] shrink-0"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

