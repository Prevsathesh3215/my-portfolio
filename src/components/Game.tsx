import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
// @ts-ignore
import "../phaser/main.js";
// @ts-ignore
import { gameScenes } from "../phaser/main.js";
import EncryptText from "./EncryptText";


export default function Game() {
  const gameContainer = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    if (!gameInstance.current && gameContainer.current) {
      gameInstance.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        parent: gameContainer.current,
        physics: {
          default: "arcade",
          arcade: { gravity: { y: 0 }, debug: false },
        },
        scene: gameScenes, // <-- using your exported scenes
      });
    }

    return () => {
      gameInstance.current?.destroy(true);
      gameInstance.current = null;
    };
  }, []);

  return (
    <>
      <div className="flex justify-start">
        <EncryptText text="Check Out My Game Here!" revealedClassName="text-3xl text-blue-500 font-retro" encryptedClassName="text-3xl text-blue-500 font-retro" />
      </div>
      <div
        ref={gameContainer}
        style={{
          width: "100%",
          height: "720px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          borderRadius: "30px",
          overflow: "hidden",
          marginBottom: "30px",
          marginTop: "60px",
        }}
      />
    </>
  );
}
