import Phaser from "phaser";
import Knight from "./knight";
import Mage from "./mage";
import Minotaur from "./minotaur";
import Enemy from "./enemy";

function getAssetPath(path) {
  console.log(import.meta.env.BASE_URL);
  // import.meta.env.BASE_URL points to '/my-portfolio/' in production on GitHub Pages
  return import.meta.env.BASE_URL + "assets" + path;
}

async function ensureFontLoaded() {
  if (document.readyState !== "complete") {
    await new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve);
      }
    });
  }

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;

      const fontSpec = '16px "Press Start 2P"';
      if (!document.fonts.check(fontSpec)) {
        await document.fonts.load(fontSpec);
      }

      let attempts = 0;
      while (!document.fonts.check(fontSpec) && attempts < 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      if (document.fonts.check(fontSpec)) {
        console.log("✓ Press Start 2P font loaded successfully");
        return Promise.resolve();
      } else {
        console.warn("⚠ Font may not be loaded, but continuing anyway");
      }
    } catch (e) {
      console.warn("Font loading error:", e);
    }
  } else {
    console.warn("Font Loading API not available, waiting 500ms");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

function createTextWithFont(
  scene,
  x,
  y,
  text,
  fontSize = 16,
  color = "#ffffff",
  backgroundColor = null,
  padding = null,
  align = false
) {
  const fontFamily = "Press Start 2P";

  return scene.add.text(x, y, text, {
    fontFamily: `"${fontFamily}", monospace`,
    fontSize: `${fontSize}px`,
    color: color,
    backgroundColor: backgroundColor,
    padding: padding ? { x: 20, y: 10 } : null,
    align: align ? "center" : null,
  });
}

function setupEnemyCollisions(scene, enemy) {
  scene.physics.add.overlap(enemy.attackHitbox, knight, () => {
    knight.takeDamage(1);
  });
  scene.physics.add.overlap(enemy.attackHitbox, mage, () => {
    mage.takeDamage(1.5);
  });
  scene.physics.add.overlap(knight.attackHitbox, enemy, () => {
    if (
      knight.attackHitbox.active &&
      scene.currentPlayer === knight &&
      !enemy.isDead
    ) {
      enemy.takeDamage(1);
    }
  });
  scene.physics.add.overlap(mage.attackHitbox, enemy, () => {
    if (
      mage.attackHitbox.active &&
      scene.currentPlayer === mage &&
      !enemy.isDead
    ) {
      enemy.takeDamage(3);
    }
  });
}

function handlePlayerSwitch(scene) {
  console.log(
    "handlePlayerSwitch called, currentPlayer:",
    currentPlayer === knight ? "Knight" : "Mage"
  );

  const prev = currentPlayer;
  const next = currentPlayer === knight ? mage : knight;

  console.log(
    "Switching from",
    prev === knight ? "Knight" : "Mage",
    "to",
    next === knight ? "Knight" : "Mage"
  );
  console.log("Mage active:", mage.active, "visible:", mage.visible);
  console.log("Knight active:", knight.active, "visible:", knight.visible);

  next.x = prev.x;
  next.y = prev.y;
  next.flipX = prev.flipX;

  prev.setVelocity(0);
  next.setVelocity(0);

  prev.setVisible(false);
  if (prev.setActive) prev.setActive(false);
  next.setVisible(true);
  if (next.setActive) next.setActive(true);

  const textureKey = next === knight ? "knight_idle" : "mage_idle";
  console.log(
    "Setting texture to:",
    textureKey,
    "for",
    next === knight ? "Knight" : "Mage"
  );
  next.setTexture(textureKey, 0);

  if (next.anims) {
    next.anims.stop();
  }

  const idleKey = next === knight ? "idle" : "mage_idle";
  next.anims.play(idleKey, true);

  if (next.texture.key !== textureKey) {
    console.error(
      "Texture mismatch! Expected:",
      textureKey,
      "Got:",
      next.texture.key
    );
    next.setTexture(textureKey, 0);
  }
  next.setDepth(10);
  prev.setDepth(9);

  if (next.parentContainer) {
    next.parentContainer.bringToTop(next);
  }

  next.setVisible(true);
  next.clearTint();

  console.log(
    "Next character texture:",
    next.texture?.key || "MISSING",
    "visible:",
    next.visible,
    "active:",
    next.active
  );

  if (prev.body) prev.body.enable = false;
  if (next.body) next.body.enable = true;

  if (prev.attackHitbox && prev.attackHitbox.body)
    prev.attackHitbox.body.enable = false;
  if (next.attackHitbox && next.attackHitbox.body)
    next.attackHitbox.body.enable = false;

  if (prev.healthBar && prev.healthBar.bar)
    prev.healthBar.bar.setVisible(false);
  if (next.healthBar && next.healthBar.bar) next.healthBar.bar.setVisible(true);
  if (next.healthBar) next.healthBar.follow(next);

  currentPlayer = next;
  scene.currentPlayer = currentPlayer;

  console.log(
    "After switch - Mage visible:",
    mage.visible,
    "Knight visible:",
    knight.visible
  );
  console.log(
    "New currentPlayer:",
    currentPlayer === knight ? "Knight" : "Mage"
  );
}

let knight;
let mage;
let cursors;
let attackKey;
let blockKey;
let runKey;
let magicKey;
let restartKey;

let currentPlayer;
let switchKey;

// const game = new Phaser.Game(config);

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    const { width, height } = this.game.config;

    this.titleText = createTextWithFont(
      this,
      width / 2,
      height / 4,
      "CLICK START TO PLAY",
      32,
      "#ffffff"
    );
    this.titleText.setOrigin(0.5, 0);
    this.titleText.setDepth(100);

    // this.startBtn = this.add
    //   .text(width / 2, height / 2 + 20, "START", {
    //     fontSize: "32px",
    //     backgroundColor: "#333",
    //     padding: { x: 20, y: 10 },
    //   })

    this.startBtn = createTextWithFont(
      this,
      width / 2,
      height / 2 + 20,
      "START",
      32,
      "#ffffff",
      "#333",
      true
    );
    this.startBtn.setOrigin(0.5);
    this.startBtn.setInteractive({ useHandCursor: true });

    this.startBtn.on("pointerdown", () => {
      this.scene.start("BootScene");
    });
  }
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  create() {
    this.scene.start("RPGScene");
  }
}

export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "PauseScene" });
  }

  create() {
    // this.add
    //   .text(
    //     this.cameras.main.centerX,
    //     this.cameras.main.centerY,
    //     "PAUSED\nPress P to Resume",
    //     { fontSize: "32px", color: "#ffffff", align: "center" }
    //   )
    //   .setOrigin(0.5);
    const { width, height } = this.scale;

    this.pauseText = createTextWithFont(
      this,
      width / 2,
      height / 2,
      "PAUSED\nPress P to Resume",
      32,
      "#ffffff",
      null,
      null,
      true
    );
    this.pauseText.setOrigin(0.5);

    // Resume when P is pressed
    this.resumeKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
    this.resumeKey.on("down", () => {
      this.scene.stop(); // Remove PauseScene
      this.scene.resume("RPGScene"); // Resume underlying RPGScene
      console.log("Game Resumed!");
    });
  }
}

export class RPGScene extends Phaser.Scene {
  constructor() {
    super({ key: "RPGScene" });
  }

  preload() {
    this.enemies = [];

    this.load.image(
      "bg_back",
      getAssetPath("/background/parallax-forest-back-trees.png")
    );
    this.load.image(
      "bg_lights",
      getAssetPath("/background/parallax-forest-lights.png")
    );
    this.load.image(
      "bg_middle",
      getAssetPath("/background/parallax-forest-middle-trees.png")
    );
    this.load.image(
      "bg_front",
      getAssetPath("/background/parallax-forest-front-trees.png")
    );

    // MAGE

    this.load.spritesheet(
      "mage_idle",
      getAssetPath("/female_player/Idle.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "mage_walk",
      getAssetPath("/female_player/Walk.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet("mage_run", getAssetPath("/female_player/Run.png"), {
      frameWidth: 128,
      frameHeight: 71,
    });

    this.load.spritesheet(
      "mage_dead",
      getAssetPath("/female_player/Dead.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "mage_attack",
      getAssetPath("/female_player/Attack_1.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "mage_attack_two",
      getAssetPath("/female_player/Attack_2.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "mage_magic",
      getAssetPath("/female_player/Light_charge.png"),
      {
        frameWidth: 128,
        frameHeight: 72,
      }
    );

    // KNIGHT

    this.load.spritesheet(
      "knight_idle",
      getAssetPath("/knight/knight_idle.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "knight_walking",
      getAssetPath("/knight/knight_walking.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "knight_running",
      getAssetPath("/knight/knight_running.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "knight_attack",
      getAssetPath("/knight/knight_attack.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "knight_attack_two",
      getAssetPath("/knight/knight_attack_2.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "knight_attack_three",
      getAssetPath("/knight/knight_attack_3.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "knight_block",
      getAssetPath("/knight/knight_block.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    this.load.spritesheet(
      "knight_dead",
      getAssetPath("/knight/knight_dead.png"),
      {
        frameWidth: 128,
        frameHeight: 71,
      }
    );

    // MINOTAUR

    this.load.spritesheet(
      "minotaur_idle",
      getAssetPath("/enemies/minotaur/minotaur_idle.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "minotaur_attack",
      getAssetPath("/enemies/minotaur/minotaur_attack.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "minotaur_walking",
      getAssetPath("/enemies/minotaur/minotaur_walking.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "minotaur_dead",
      getAssetPath("/enemies/minotaur/minotaur_dead.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    // TENGU
    this.load.spritesheet(
      "tengu_idle",
      getAssetPath("/enemies/yamabushi_tengu/Idle.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "tengu_attack",
      getAssetPath("/enemies/yamabushi_tengu/Attack_1.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "tengu_walking",
      getAssetPath("/enemies/yamabushi_tengu/Walk.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "tengu_dead",
      getAssetPath("/enemies/yamabushi_tengu/Dead.png"),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    // FROST GUARDIAN

    this.load.spritesheet(
      "boss_idle",
      getAssetPath("/frost_guardian/sprite_0.PNG"),
      {
        frameWidth: 192,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "boss_walking",
      getAssetPath("/frost_guardian/sprite_1.PNG"),
      {
        frameWidth: 192,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "boss_attack",
      getAssetPath("/frost_guardian/sprite_2.PNG"),
      {
        frameWidth: 192,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "boss_dead",
      getAssetPath("/frost_guardian/sprite_4.png"),
      {
        frameWidth: 192,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "boss_spawn",
      getAssetPath("/frost_guardian/sprite_4.png"),
      {
        frameWidth: 192,
        frameHeight: 128,
      }
    );

    this.load.audio("bg_music", getAssetPath("/battle_music.mp3"));
    this.load.audio("boss_music", getAssetPath("/boss_music.mp3"));
    this.load.audio("victory_music", getAssetPath("/victory_fanfare.mp3"));
  }

  create() {
    const pauseKey = this.input.keyboard.addKey("P");

    pauseKey.on("down", () => {
      if (!this.scene.isActive("PauseScene")) {
        this.scene.launch("PauseScene"); // Launch overlay
        this.scene.pause(); // Pause RPGScene
        console.log("Game Paused!");
      }
    });

    this.cameras.main.setBackgroundColor("#222");

    const { width, height } = this.scale;

    const bgLayers = [
      { key: "bg_back", depth: -10, speed: 0.1 },
      { key: "bg_lights", depth: -9, speed: 0.15 },
      { key: "bg_middle", depth: -8, speed: 0.4 },
      { key: "bg_front", depth: -7, speed: 0.8 },
    ];

    this.bgLayerData = {};

    bgLayers.forEach((layerConfig) => {
      const tex = this.textures.get(layerConfig.key).getSourceImage();
      const scaleX = width / tex.width;
      const scaleY = height / tex.height;
      const scale = Math.max(scaleX, scaleY);
      const scaledWidth = tex.width * scale;

      const images = [];
      for (let i = 0; i < 3; i++) {
        const img = this.add.image(i * scaledWidth, 0, layerConfig.key);
        img.setScale(scale);
        img.setOrigin(0, 0);
        img.setDepth(layerConfig.depth);
        images.push(img);
      }

      this.bgLayerData[layerConfig.key] = {
        images: images,
        speed: layerConfig.speed,
        scaledWidth: scaledWidth,
        offset: 0,
      };
    });

    this.bgMusic = this.sound.add("bg_music", {
      loop: true,
      volume: 0.5,
    });

    this.bossMusic = this.sound.add("boss_music", {
      loop: true,
      volume: 0.8,
    });

    this.victoryMusic = this.sound.add("victory_music", {
      loop: true,
      volume: 0.8,
    });

    this.bgMusic.play();

    cursors = this.input.keyboard.createCursorKeys();
    attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    blockKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    runKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    magicKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    const startX = 250;
    const startY = 600;

    if (!this.textures.exists("knight_idle")) {
      console.error("ERROR: knight_idle texture not loaded!");
    }
    if (!this.textures.exists("mage_idle")) {
      console.error("ERROR: mage_idle texture not loaded!");
    }

    knight = new Knight(this, startX, startY);
    mage = new Mage(this, startX, startY);

    console.log("Knight texture after creation:", knight.texture?.key);
    console.log("Mage texture after creation:", mage.texture?.key);

    knight.setTexture("knight_idle", 0);
    mage.setTexture("mage_idle", 0);

    if (knight.texture?.key !== "knight_idle") {
      console.error("Knight texture is wrong:", knight.texture?.key);
    }
    if (mage.texture?.key !== "mage_idle") {
      console.error(
        "Mage texture is wrong:",
        mage.texture?.key,
        "- fixing now"
      );
      mage.setTexture("mage_idle", 0);
      if (mage.anims) {
        mage.anims.stop();
        mage.anims.play("idle", true);
      }
    }

    knight.setDepth(10);
    mage.setDepth(10);

    this.knight = knight;
    this.mage = mage;

    currentPlayer = knight;
    this.currentPlayer = currentPlayer;

    if (currentPlayer === knight) {
      // Knight starts active
      knight.setVisible(true);
      knight.setActive(true);
      knight.anims.play("idle", true);
      if (knight.body) knight.body.enable = true;
      if (knight.healthBar && knight.healthBar.bar)
        knight.healthBar.bar.setVisible(true);

      // Mage starts inactive
      mage.setVisible(false);
      mage.setActive(false);
      if (mage.body) mage.body.enable = false;
      if (mage.healthBar && mage.healthBar.bar)
        mage.healthBar.bar.setVisible(false);
    } else {
      // Mage starts active
      mage.setVisible(true);
      mage.setActive(true);
      mage.anims.play("mage_idle", true);
      if (mage.body) mage.body.enable = true;
      if (mage.healthBar && mage.healthBar.bar)
        mage.healthBar.bar.setVisible(true);

      // Knight starts inactive
      knight.setVisible(false);
      knight.setActive(false);
      if (knight.body) knight.body.enable = false;
      if (knight.healthBar && knight.healthBar.bar)
        knight.healthBar.bar.setVisible(false);
    }

    switchKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // 📝 Example text using Google Font "Press Start 2P"
    // Wait for font to load before creating text
    ensureFontLoaded()
      .then(() => {
        this.titleText = createTextWithFont(
          this,
          width / 2,
          height / 4,
          "VICTORY!",
          32,
          "#ffffff"
        );
        this.titleText.setOrigin(0.5, 0);
        this.titleText.setDepth(100);
        this.titleText.setStroke("#000000", 4);
        this.titleText.setVisible(false);
        // Score/Stats text
        this.scoreText = createTextWithFont(
          this,
          50,
          50,
          "SCORE: 0",
          16,
          "#c8c8c5ff"
        );
        this.scoreText.setOrigin(0, 0);
        this.scoreText.setDepth(100);
        this.scoreText.setStroke("#000000", 2);

        // Instructions text
        this.instructionsText = createTextWithFont(
          this,
          width / 4 + 50,
          height - 30,
          "ARROWS: MOVE | A: ATTACK | E: SWITCH | SPACE: BLOCK | Q: CAST MAGIC AS MAGE",
          12,
          "#c8c8c5ff"
        );
        this.instructionsText.setOrigin(0.5, 0);
        this.instructionsText.setDepth(100);
        this.instructionsText.setStroke("#000000", 2);

        // Wave indicator text
        this.waveText = createTextWithFont(
          this,
          width - 50,
          50,
          "WAVE: 1",
          16,
          "#c8c8c5ff"
        );
        this.waveText.setOrigin(1, 0);
        this.waveText.setDepth(100);
        this.waveText.setStroke("#000000", 2);

        console.log("Font loaded! Text created with Press Start 2P");
      })
      .catch((err) => {
        console.warn("Font loading failed, creating text with fallback:", err);
        // Create text anyway with fallback
        this.titleText = createTextWithFont(
          this,
          width / 2,
          height / 4,
          "MY RPG",
          32,
          "#ffffff"
        );
        this.titleText.setOrigin(0.5, 0);
        this.titleText.setDepth(100);
        this.titleText.setStroke("#000000", 4);
        this.titleText.setVisible(false);

        this.scoreText = createTextWithFont(
          this,
          50,
          50,
          "SCORE: 0",
          16,
          "#c8c8c5ff"
        );
        this.scoreText.setOrigin(0, 0);
        this.scoreText.setDepth(100);
        this.scoreText.setStroke("#000000", 2);

        this.instructionsText = createTextWithFont(
          this,
          width / 2,
          height - 100,
          "ARROWS: MOVE | A: ATTACK | E: SWITCH | SPACE: BLOCK",
          12,
          "#7a7a73ff"
        );
        this.instructionsText.setOrigin(0.5, 0);
        this.instructionsText.setDepth(100);
        this.instructionsText.setStroke("#000000", 2);

        this.waveText = createTextWithFont(
          this,
          width - 50,
          50,
          "WAVE: 1",
          16,
          "#c8c8c5ff"
        );
        this.waveText.setOrigin(1, 0);
        this.waveText.setDepth(100);
        this.waveText.setStroke("#000000", 2);
      });

    const minotaurConfig = {
      key: "minotaur_idle",
      scale: 1.5,
      flipX: true,
      maxHP: 100,
      hitbox: { width: 60, height: 60, offsetX: 50, offsetY: 0 },
      animations: {
        idle: { key: "minotaur_idle", start: 0, end: 9, frameRate: 4 },
        walk: { key: "minotaur_walking", start: 0, end: 4, frameRate: 8 },
        attack: { key: "minotaur_attack", start: 0, end: 4, frameRate: 8 },
        dead: { key: "minotaur_dead", start: 0, end: 5, frameRate: 8 },
      },
    };

    // const minotaurConfig = {
    //   key: "boss_idle",
    //   scale: 3.5,
    //   flipX: true,
    //   maxHP: 500,
    //   hitbox: { width: 200, height: 200, offsetX: 50, offsetY: 0 },
    //   animations: {
    //     idle: { key: "boss_idle", start: 0, end: 5, frameRate: 4 },
    //     walk: { key: "boss_walking", start: 0, end: 9, frameRate: 8 },
    //     attack: { key: "boss_attack", start: 0, end: 13, frameRate: 8 },
    //     dead: { key: "boss_dead", start: 0, end: 15, frameRate: 8 },
    //   },
    // };

    const minotaur = new Enemy(this, 1300, 560, minotaurConfig);
    this.enemies.push(minotaur);

    this.minotaur = minotaur;
    setupEnemyCollisions(this, minotaur);

    this.enemyWaveIndex = 0;

    const waveConfigs = [
      null,
      {
        key: "tengu_idle",
        scale: 1.5,
        flipX: false,
        maxHP: 250, //250
        hitbox: { width: 50, height: 50, offsetX: 40, offsetY: 0 },
        animations: {
          idle: { key: "tengu_idle", start: 0, end: 5, frameRate: 6 },
          walk: { key: "tengu_walking", start: 0, end: 7, frameRate: 8 },
          attack: { key: "tengu_attack", start: 0, end: 2, frameRate: 8 },
          dead: { key: "tengu_dead", start: 0, end: 5, frameRate: 8 },
        },
      },
      // Wave 3: Boss
      {
        key: "boss_idle",
        scale: 3.5,
        flipX: true,
        maxHP: 500,
        hitbox: { width: 400, height: 200, offsetX: 50, offsetY: 0 },
        animations: {
          spawn: { key: "boss_spawn", start: 0, end: 15, frameRate: 8 },
          idle: { key: "boss_idle", start: 0, end: 5, frameRate: 4 },
          walk: { key: "boss_walking", start: 0, end: 9, frameRate: 8 },
          attack: { key: "boss_attack", start: 0, end: 13, frameRate: 8 },
          dead: { key: "boss_dead", start: 0, end: 15, frameRate: 8 },
        },
      },
    ];

    this.events.on("enemy-died", (deadEnemy) => {
      console.log("Enemy died:", deadEnemy.texture.key);
      console.log("Wave index:", this.enemyWaveIndex);

      // Update wave text
      if (this.waveText) {
        this.waveText.setText(`WAVE: ${this.enemyWaveIndex + 1}`);
      }

      this.time.delayedCall(2000, () => {
        this.enemyWaveIndex++;

        if (this.enemyWaveIndex < waveConfigs.length) {
          const nextWaveConfig = waveConfigs[this.enemyWaveIndex];

          if (nextWaveConfig) {
            const x = 1300;
            const y = 560;
            const newEnemy = new Enemy(this, x, y, nextWaveConfig);
            this.enemies.push(newEnemy);
            setupEnemyCollisions(this, newEnemy);

            if (
              this.enemyWaveIndex === 2 ||
              nextWaveConfig.key.startsWith("boss")
            ) {
              console.log("🎵 Boss wave started — switching to boss music!");

              // Stop background music if still playing
              if (this.bgMusic && this.bgMusic.isPlaying) {
                this.bgMusic.stop();
              }

              // Play boss music once
              if (this.bossMusic && !this.bossMusic.isPlaying) {
                this.bossMusic.play();
              }
            }

            // Update minotaur reference if this is the minotaur wave
            if (nextWaveConfig.key === "minotaur_idle") {
              this.minotaur = newEnemy;
            }

            console.log("🔄 Spawned wave enemy:", nextWaveConfig.key);

            // Update wave text
            if (this.waveText) {
              this.waveText.setText(`WAVE: ${this.enemyWaveIndex + 1}`);
            }
          }
        } else {
          console.log("✅ All waves complete!");
          // Update wave text to show completion
          if (this.waveText) {
            this.waveText.setText("WAVE: COMPLETE!");
          }
          this.bossMusic.stop();
          this.victoryMusic.play();

          if (this.titleText) {
            this.titleText.setVisible(true); // 👈 Add this line to show it
          }

          this.playAgainText = createTextWithFont(
            this,
            width / 2,
            height / 2 + 50,
            "PRESS CTRL + R TO PLAY AGAIN",
            16,
            "#ffffff"
          );
          this.playAgainText.setOrigin(0.5, 0.5);
          this.playAgainText.setDepth(100);
          this.playAgainText.setStroke("#000000", 2);

          this.tweens.add({
            targets: this.playAgainText,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });
          // Optionally loop back to start or end game
        }
      });
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(switchKey)) {
      console.log("E key pressed!");
      handlePlayerSwitch(this); // Pass scene as 'this'
    }

    if (currentPlayer && currentPlayer.active) {
      currentPlayer.update(cursors, attackKey, blockKey, runKey, magicKey);
      if (currentPlayer.healthBar)
        currentPlayer.healthBar.follow(currentPlayer);
    }

    const canScroll =
      currentPlayer &&
      currentPlayer.active &&
      !currentPlayer.isAttacking &&
      !currentPlayer.isBlocking;

    const direction =
      canScroll && cursors.left.isDown
        ? 1
        : canScroll && cursors.right.isDown
        ? -1
        : 0;

    if (direction !== 0) {
      Object.keys(this.bgLayerData).forEach((key) => {
        const layer = this.bgLayerData[key];
        const moveAmount = layer.speed * direction;
        const screenWidth = this.scale.width;

        layer.images.forEach((img) => {
          img.x += moveAmount;
        });

        layer.images.forEach((img) => {
          if (img.x <= -layer.scaledWidth) {
            const rightmostX = Math.max(...layer.images.map((i) => i.x));
            img.x = rightmostX + layer.scaledWidth;
          }

          if (img.x >= screenWidth + layer.scaledWidth) {
            const leftmostX = Math.min(...layer.images.map((i) => i.x));
            img.x = leftmostX - layer.scaledWidth;
          }
        });
      });
    }

    this.currentPlayer = currentPlayer;

    if (this.enemies && this.enemies.length > 0) {
      this.enemies = this.enemies.filter(
        (enemy) => enemy && enemy.active && !enemy.isDead
      );
      this.enemies.forEach((enemy) => {
        if (enemy && enemy.active && !enemy.isDead) {
          enemy.update(currentPlayer);
        }
      });
    }

    // if (Phaser.Input.Keyboard.JustDown(blockKey)) {
    //   this.isBlocking = true;
    //   this.anims.play("block", true); // optional: play block animation
    // }

    // if (Phaser.Input.Keyboard.JustUp(blockKey)) {
    //   this.isBlocking = false;
    //   if (!this.isAttacking) this.anims.play("idle", true);
    // }
  }
}

// const config = {
//   type: Phaser.AUTO,
//   width: 1280,
//   height: 720,
//   physics: {
//     default: "arcade",
//     arcade: { gravity: { y: 0 }, debug: false },
//   },
//   scene: RPGScene,
// };

// window.gameScene = [BootScene, RPGScene];

export const gameScenes = [StartScene, BootScene, RPGScene, PauseScene];
