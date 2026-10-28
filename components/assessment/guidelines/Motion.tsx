"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";


type GuidelinesMotionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const GuidelinesMotion = ({
  id,
  children,
  className,
}: GuidelinesMotionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      id={id}
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 24, scale: 0.985 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
            }
      }
      className={className}
    >
      {children}
    </motion.article>
  );
};
