import { useEffect, useState } from "react";

export const Useorigin = () => {
  const [mounted, setismounted] = useState(false);
  useEffect(() => {
    setismounted(true);
  }, []);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  if (!mounted) {
    return "";
  }
  return origin;
};
