import { EncryptedText } from "@/components/ui/encrypted-text";
import React from "react";
import { useState, useEffect } from "react";

interface EncryptProps {
  text: string;
  revealedClassName?: string;
  encryptedClassName?: string;
  revealDelayMs?: number;
  flipDelayMs?: number;
  cycleIntervalMs?: number;
}

const EncryptText: React.FC<EncryptProps> = ({
  text,
  revealedClassName,
  encryptedClassName,
  revealDelayMs = 50,
  flipDelayMs = 50,
  cycleIntervalMs = 10000,
}) => {
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealed((prev) => {
        return !prev;
      });
    }, cycleIntervalMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="max-w-3xl py-10 text-left">
      <EncryptedText
        key={revealed ? "revealed" : "encrypted"}
        text={text}
        revealedClassName={revealed ? revealedClassName : encryptedClassName}
        encryptedClassName={revealed ? encryptedClassName : revealedClassName}
        revealDelayMs={revealDelayMs}
        flipDelayMs={flipDelayMs}
      />
    </p>
  );
};

export default EncryptText;
