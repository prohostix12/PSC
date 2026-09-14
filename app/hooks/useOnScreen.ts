"use client";

import { useEffect, useState, type RefObject } from "react";

export function useOnScreen(
  targetRef: RefObject<Element | null>,
  rootMargin = "200px"
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [rootMargin, targetRef]);

  return isVisible;
}