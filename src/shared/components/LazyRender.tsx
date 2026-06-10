import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

interface LazyRenderProps {
  children: ReactNode;
  placeholderHeight?: number;
  rootMargin?: string;
}

export default function LazyRender({
  children,
  placeholderHeight = 400,
  rootMargin = "400px",
}: LazyRenderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 40,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      style={{
        minHeight: visible ? undefined : placeholderHeight,
      }}
    >
      {visible ? children : null}
    </motion.div>
  );
}
