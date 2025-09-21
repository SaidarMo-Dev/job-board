import { useEffect, useRef } from "react";

export function InfiniteScrollObserver({
  onIntersect,
  disabled,
}: {
  onIntersect: () => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect();
      },
      { threshold: 1.0 }
    );

    const el = ref.current;
    if (!el) return;

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [onIntersect, disabled]);

  return (
    <div ref={ref} className="p-2 text-center">
      ⬇️
    </div>
  );
}
