class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // load your UI images or use Phaser text buttons
  }

  create() {
    // CENTER
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // --- START BUTTON ---
    const startBtn = this.add.text(centerX, centerY, "START GAME", {
      fontSize: "48px",
      fontFamily: "Arial",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" });

    startBtn.on("pointerdown", () => {
      this.scene.start("RPGScene");       // your main game
    });
  }
}