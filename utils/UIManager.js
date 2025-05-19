class UIManager {

    displayBlinkingUIMessage(content, position){
        const message = add([
            text(content, {
                size: 24,
                font: "Round"
            }),
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
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                easings.linear
            )
            message.enterState("flash-down")
        })

        message.onStateEnter("flash-down", async () => {
            await tween(
                message.opacity,
                1,
                0.5,
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                easings.linear
            )
            message.enterState("flash-up")
        })
    }

    displayMainMenu() {
        add([
            sprite("forest-background"),
            scale(4)
            
        ])
        add([
            sprite("logo"),
            area(),
            anchor("center"),
            pos(center().x, center().y - 200),
            scale(8)
        ])

        this.displayBlinkingUIMessage(
            "Aperte [ Enter ] para Comecar o Jogo",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui", {speed: 1.5})
            go("controls")
        })
    }
    
    displayControlsMenu() {
        add([
            sprite("forest-background"),
            scale(4)
            
        ])
        add([
            text("Controles", { font: "Round", size: 50 }),
            area(),
            anchor("center"),
            pos(center().x, center().y - 200),
        ])

        const controlPrompts = add([
            pos(center().x + 30, center().y),
        ])
        controlPrompts.add([
            sprite("up"),
            pos(0, -80),
        ])
        controlPrompts.add([sprite("down")])
        controlPrompts.add([sprite("left"), pos(-80, 0)])
        controlPrompts.add([sprite("right"), pos(80, 0)])
        controlPrompts.add([sprite("space"), pos(-200, 0)])
        
        controlPrompts.add([
            text("Pular", { font: "Round", size: 32 }),
            pos(-198, 100),
        ])

        controlPrompts.add([
            text("Mover", { font: "Round", size: 32 }),
            pos(0, 100),
        ])

        this.displayBlinkingUIMessage(
            "Aperte [ Enter ] para Comecar o Jogo",
            vec2(center().x, center().y + 300)
        )
        onKeyPress("enter", () => {
            play("confirm-ui", { speed: 1.5 })
            go(1)
        })
    }
}


export const uiManager = new UIManager()