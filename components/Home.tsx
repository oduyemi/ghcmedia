
"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { getHomeConfig } from "@/utils/config";
import ContactMediaDialog from "@/dialogs/contact-dialog";

type HomeConfig = ReturnType<typeof getHomeConfig>;
type FeaturedCollection = HomeConfig["featuredCollections"][number];

interface HomeProps {
  config: HomeConfig;
}

const DESKTOP_FRAMES = [
  {
    right: "0%",
    top: "0%",
    width: "90%",
    rotate: -3,
    zIndex: 1,
  },
  {
    right: "15%",
    top: "10%",
    width: "90%",
    rotate: 2,
    zIndex: 2,
  },
  {
    right: "30%",
    top: "20%",
    width: "90%",
    rotate: -1,
    zIndex: 3,
  },
  {
    right: "5%",
    top: "30%",
    width: "85%",
    rotate: 3,
    zIndex: 4,
  },
  {
    right: "25%",
    top: "5%",
    width: "85%",
    rotate: -2,
    zIndex: 5,
  },
  {
    right: "40%",
    top: "15%",
    width: "85%",
    rotate: 1,
    zIndex: 6,
  },
] as const;

const MOBILE_FRAMES = [
  { rotate: -3, zIndex: 1 },
  { rotate: 2, zIndex: 2 },
  { rotate: -1, zIndex: 3 },
] as const;

function getCollection(
  collections: FeaturedCollection[],
  index: number,
): FeaturedCollection | undefined {
  if (!collections.length) return undefined;
  return collections[((index % collections.length) + collections.length) % collections.length];
}

export const Home= ({ config }: HomeProps) => {
  const collections = config.featuredCollections ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const count = collections.length;
  const activeCollection = getCollection(collections, activeIndex);

  const goToNext = useCallback(() => {
    if (count < 2) return;
    setActiveIndex((current) => (current + 1) % count);
  }, [count]);

  const goToPrevious = useCallback(() => {
    if (count < 2) return;
    setActiveIndex((current) => (current - 1 + count) % count);
  }, [count]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < count) {
        setActiveIndex(index);
      }
    },
    [count],
  );

  useEffect(() => {
    if (shouldReduceMotion || count < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, 3000);
  
    return () => window.clearInterval(interval);
  }, [count, shouldReduceMotion]);
  if (!activeCollection || count === 0) return null;

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  const desktopImages = DESKTOP_FRAMES.map((_, index) =>
    getCollection(collections, activeIndex + index),
  );

  const mobileImages = MOBILE_FRAMES.map((_, index) =>
    getCollection(collections, activeIndex + index),
  );

  const primaryLabel =
    config.hero?.cta?.primary ?? "Login";
  const secondaryLabel =
    config.hero?.cta?.secondary ?? "Contact Media Leadership";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Original soft background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50"
      />

      <main
        className="relative z-10 flex flex-1 items-center py-8 md:py-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null,
            )
          ) {
            setIsPaused(false);
          }
        }}
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            {/* Mobile collage: original three stacked frames */}
            <div className="relative flex h-[45vh] min-h-[290px] items-center justify-center md:hidden">
              <div className="relative h-[35vh] max-h-[380px] min-h-[230px] w-full max-w-[400px]">
                {mobileImages.map((collection, index) => {
                  if (!collection) return null;
                  const frame = MOBILE_FRAMES[index];

                  return (
                    <motion.div
                      key={`mobile-${index}-${collection.id}`}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.97 }
                      }
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: frame.rotate,
                      }}
                      transition={{
                        ...transition,
                        delay: shouldReduceMotion ? 0 : index * 0.06,
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { scale: 1.02 }
                      }
                      style={{ zIndex: frame.zIndex }}
                      className="absolute inset-0 aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-50 to-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-xl">
                        <Image
                          src={collection.image}
                          alt={collection.title}
                          fill
                          sizes="(max-width: 767px) 90vw, 400px"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </motion.div>
                  );
                })}

                {/* Small decorative accents */}
                <motion.span
                  aria-hidden="true"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [0, -5, 0], rotate: [0, 6, 0] }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -left-1 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300 text-lg shadow-sm"
                >
                  ✳
                </motion.span>

                <motion.span
                  aria-hidden="true"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [0, 5, 0], rotate: [0, -6, 0] }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-1 bottom-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-sky-200 text-base shadow-sm"
                >
                  ✦
                </motion.span>
              </div>
            </div>

            {/* Desktop collage: original six overlapping frames */}
            <div className="relative hidden h-[600px] items-center md:flex">
              {desktopImages.map((collection, index) => {
                if (!collection) return null;
                const frame = DESKTOP_FRAMES[index];

                return (
                  <motion.div
                    key={`desktop-${index}-${collection.id}`}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.97 }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: frame.rotate,
                    }}
                    transition={{
                      ...transition,
                      delay: shouldReduceMotion ? 0 : index * 0.055,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.02 }
                    }
                    style={{
                      right: frame.right,
                      top: frame.top,
                      width: frame.width,
                      zIndex: frame.zIndex,
                    }}
                    className="absolute aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl">
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        sizes="(min-width: 768px) 550px, 90vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Subtle decorative accents */}
              <motion.span
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -5, 0], rotate: [0, 6, 0] }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-[2%] top-[8%] z-[7] flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300 text-lg shadow-sm"
              >
                ✳
              </motion.span>

              <motion.span
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, 5, 0], rotate: [0, -6, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[7%] right-[4%] z-[7] flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-sky-200 text-lg shadow-sm"
              >
                ✦
              </motion.span>
            </div>

            {/* Right introduction area */}
            <div className="relative z-20 mt-2 flex flex-col justify-center md:mt-0">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-700 shadow-sm sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Media Team Assessment Portal
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm text-slate-400"
                >
                  ✦
                </span>
              </div>

              <h1 className="max-w-2xl text-[2.45rem] font-bold leading-[.98] tracking-[-0.035em] text-slate-950 sm:text-5xl xl:text-[3.7rem]">
                Excellence in Every Frame.
                <span className="relative mt-1 block w-fit">
                  <span className="relative z-10">
                    Purpose in Every Story.
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 -z-0 h-2 w-[78%] rounded-full bg-amber-300/80 sm:h-3"
                  />
                </span>
              </h1>

              

              {/* Active collection information */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`details-${activeCollection.id}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -6 }
                  }
                  transition={{ duration: 0.3 }}
                  className="mt-7 border-l-2 border-amber-300 pl-4 sm:mt-8 sm:pl-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-px w-8 bg-slate-200" />
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {activeCollection.title}
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    {activeCollection.description}
                  </p>

                  <Link
                    href={activeCollection.link}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition-colors hover:text-amber-700"
                  >
                    Explore
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Main CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Link
                href="/login"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#0C2340] bg-[#0C2340] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#0C2340]/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan hover:bg-brand-cyan hover:shadow-lg hover:shadow-brand-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 sm:w-auto sm:min-w-[150px] sm:px-7"
            >
                {primaryLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <ContactMediaDialog
                onSubmit={async (data) => {
                    const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    });

                    if (!response.ok) {
                    throw new Error("Unable to send your message.");
                    }
                }}
                />
            </div>

              {/* Supporting note */}
              <div className="mt-6 flex items-center gap-3 text-xs text-slate-500 sm:text-sm">
                <span
                  aria-hidden="true"
                  className="flex -space-x-2"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-amber-200 text-[10px] font-bold text-slate-800">
                    M
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-sky-200 text-[10px] font-bold text-slate-800">
                    C
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-200 text-[10px] font-bold text-slate-800">
                    T
                  </span>
                </span>
                <span>One team. Every detail. A better service.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Keep your existing footer */}
      <div className="relative z-10">
        {/* Import and render your existing Footer here if it is part of this file. */}
      </div>
    </div>
  );
}
