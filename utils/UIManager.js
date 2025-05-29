import { bgSoundManager } from "./BGSoundManager.js"

class UI {
  displayLivesCount(player) {
    this.livesCountUI = add([
      text(`${player.lives}`, {
        font: "Round",
        size: 50,
      }),
      fixed(),
      pos(70, 10),
    ])

    this.livesCountUI.add([
      sprite("star-icon"),
      pos(-60, -5),
      scale(3),
      fixed(),
    ])
  }

  displayCoinCount(player) {
    this.coinCountUI = add([
      text(`${player.coins} / ${this.fullCoinCount}`, {
        font: "Round",
        size: 50,
      }),
      {
        fullCoinCount: get("coin", { recursive: true }).length,
      },
      fixed(),
      pos(70, 70),
    ])

    this.coinCountUI.add([sprite("coin-icon"), pos(-80, -20), scale(3), fixed()])
  }

  displayBlinkingUIMessage(content, position) {
    const message = add([
      text(content, { size: 24, font: "Round" }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      state("flash-up", ["flash-up", "flash-down"]),
    ])

    message.onStateEnter("flash-up", async () => {
      await tween(
        message.opacity,
        0,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-down")
    })

    message.onStateEnter("flash-down", async () => {
      await tween(
        message.opacity,
        1,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-up")
    })
  }

  displayMainMenu() {
    add([sprite("forest-background"), scale(4)])
    add([
      sprite("logo"),
      fixed(),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
      scale(8),
    ])

    this.displayBlinkingUIMessage(
      "Aperte [ Enter ] Para Comecar o jogo",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 })
      go("controls")
    })
  }

  displayControlsMenu() {
    add([sprite("forest-background"), scale(4)])
    add([
      text("Controles", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
    ])

    const controlPrompts = add([pos(center().x + 30, center().y)])
    controlPrompts.add([sprite("up"), pos(0, -80)])
    controlPrompts.add([sprite("down")])
    controlPrompts.add([sprite("left"), pos(-80, 0)])
    controlPrompts.add([sprite("right"), pos(80, 0)])
    controlPrompts.add([sprite("space"), pos(-200, 0)])
    controlPrompts.add([
      text("Pular", { font: "Round", size: 32 }),
      pos(-195, 100),
    ])
    controlPrompts.add([
      text("mover", { font: "Round", size: 32 }),
      pos(0, 100),
    ])

    this.displayBlinkingUIMessage(
      "Aperte [ Enter ] para comecar o jogo",
      vec2(center().x, center().y + 300)
    )

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 })
      go(1)
    })
  }

  displayGameOverScreen() {
    bgSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(0, 0, 0)])
    add([
      text("Game Over!", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.displayBlinkingUIMessage(
      "aperte [ Enter ] para comecar o jogo novamente",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("enter", () => {
      play("confirm-ui")
      go(1)
    })
  }

  displayEndGameScreen() {
    bgSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(0, 0, 0)])
    add([
      text("Voce ganhou! Obrigrado por jogar.", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.displayBlinkingUIMessage(
      "aperte [ Enter ] para jogar novamente",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("enter", () => {
      play("confirm-ui")
      go("menu")
    })
  }

  addDarkBg() {
    add([rect(270, 130), color(0, 0, 0), fixed()])
  }
}

export const UIManager = new UI()
