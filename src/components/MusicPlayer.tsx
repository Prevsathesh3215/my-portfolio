import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { FaMusic } from "react-icons/fa";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        import.meta.env.BASE_URL + "assets/pokemon.mp3"
      );
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction.");
      });
      setIsPlaying(true);
    }
  };

  return (
    <Button onClick={toggleMusic} variant="ghost" size="icon">
      <FaMusic className={isPlaying ? "text-green-500" : "text-red-500"} />
    </Button>
  );
}
