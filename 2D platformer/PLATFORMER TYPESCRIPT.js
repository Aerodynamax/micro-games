//  init
led.setDisplayMode(DisplayMode.Greyscale)
function DrawLevel(Xpos: number, Ypos: number, Xlen: number, Yheight: number, level: Array<Array<number>>, brightness?: number) {
    if (LavaEnabled) {
        DrawLava(level)
    }
    for (let y = 0; y < Yheight; y += 1) {
        for (let x = 0; x < Xlen; x += 1) {
            if (brightness) {
                led.plotBrightness(x, y, level[Ypos + y][Xpos + x] % BlockStateCount * brightness)
            } else if (level[Ypos + y][Xpos + x] == 6 && !ShowInvis) {
                led.plotBrightness(x, y, 0)
            } else if (level[Ypos + y][Xpos + x] == 11 && ShowInvis) {
                led.plotBrightness(x, y, 0)
            } else if (level[Ypos + y][Xpos + x] != 6 || ShowInvis) {
                led.plotBrightness(x, y, level[Ypos + y][Xpos + x] % BlockStateCount * Multiplicant)
            }
        }
    }
}
function MoveLevel(level: Array<Array<number>>) {
    playerXworldspace = LevelX + PlayerX
    playerYworldspace = LevelY + PlayerY
    if (key == Button.A && CheckCollisionPlayer(playerXworldspace - 1, playerYworldspace, PlayerHeight, level)) {
        LevelX -= 1
    }
    if (key == Button.B && CheckCollisionPlayer(playerXworldspace + 1, playerYworldspace, PlayerHeight, level)) {
        LevelX += 1
    }
    if (key == Button.AB) {
        JumpPlayer(playerXworldspace, playerYworldspace, PlayerHeight, level)
    }
}

let BlockStateCount = 5
let LastBlockState  = 0
let Multiplicant = 255 / BlockStateCount

let Level0 = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
let Level1 = [
    [0, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 13, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
let Level2 = [
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 13, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 3],
    [0, 13, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
    [0, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
let Level3 = [
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0,  0,  0,  0,  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  6,  6,  0,  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  6, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  1,  1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1,  1,  1,  1,  1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 13, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1,  1,  1,  1,  1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1,  1,  1,  1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1,  1,  1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

let LevelStartX = 0
let LevelStartY = 0
let LevelX = LevelStartX
let LevelY = LevelStartY

let RunningLevel: Array<Array<number>>
let LevelUntouched: Array<Array<number>>

let LevelXlen = 5
let LevelYheight = 5
let LevelComplete = false

function DrawLava(level: Array<Array<number>>) {
    if (currLavaCooldown > 0) {
        currLavaCooldown -= 1
    }
    else {
        for (let i = 0; i < level[currLavaLevel].length; i++) {
            level[currLavaLevel][i] = 8
        }
        currLavaLevel -= 1
        currLavaCooldown = LavaCooldown
    }
}
let LavaEnabled = false
let LavaLevel = 0
let currLavaLevel = LavaLevel
let LavaCooldown = 0
let currLavaCooldown = LavaCooldown


function DrawInvisBlocks(level: Array<Array<number>>) {
    if (ShowInvis) {

    }
}
let ShowInvis = false
let InvisCooldown = 10
let currInvisCooldown = InvisCooldown

function DrawPlayer(Xpos: number, Ypos: number, Yheight: number) {
    for (let y = 0; y < Yheight; y++) {
        led.plotBrightness(Xpos, Ypos - y, 255)
    }
}
function GravityPlayer(Xpos: number, Ypos: number, level: Array<Array<number>>): number {
    // Level[Ypos + 1][Xpos] == 0
    if (GravityPause > 0) {
        GravityPause -= 1
        return 0
    }
    // stay in screen
    if (PlayerY < 2) {
        LevelY -= 1
        return 1
    }
    if (PlayerY > 3) {
        LevelY += 1
        return -1
    }
    if (!CheckCollisionPlayer(Xpos, Ypos, PlayerHeight, level)) {
        return -1
    }
    if (CheckCollisionPlayer(Xpos, Ypos + 1, PlayerHeight, level)) {
        return 1
    }
    return 0
}
function CheckCollisionPlayer(Xnext: number, Ynext: number, Yheight: number, level: Array<Array<number>>) : boolean {
    let DoesntCollide = true

    let ScreenSpaceX = Xnext - LevelX
    let ScreenSpaceY = Ynext - LevelY

    for (let y = 0; y < Yheight; y++) {
        // if in bounds
        if (Ynext - y < 0 || Ynext - y > level.length) {
            DoesntCollide = false
        } 
        // block specific
        let blockState = level[Ynext - y][Xnext]
        if (blockState == 3) {
            LastBlockState = 3
            LevelComplete = true
            DoesntCollide = false
        }
        else if (blockState == 9) {
            LastBlockState = 9
            basic.clearScreen()
            basic.pause(300)
            TeleportPlayer(LevelStartX, LevelStartY, PlayerStartX, PlayerStartY)
            DoesntCollide = false
        }
        else if (blockState == 4) {
            LastBlockState = 4
            // animation
            led.plotBrightness(ScreenSpaceX, ScreenSpaceY - y, 0)
            led.plotBrightness(ScreenSpaceX, ScreenSpaceY - Yheight, 4 % BlockStateCount * Multiplicant)
            basic.pause(1000)

            let CurrLevelX = LevelX

            for (let i = 0; i < 20; i++) {
                let Xoffset = randint(-1, 1)
                let Yoffset = randint(-1, 1)

                DrawLevel(CurrLevelX + Xoffset, LevelY, LevelXlen-Xoffset, LevelYheight, level)

                basic.pause(50)
            }
            // finish
            level[Ynext - y][Xnext] = 0
            level[Ynext][Xnext] = 0
            DrawLevel(CurrLevelX, LevelY, LevelXlen, LevelYheight, level)
            DrawPlayer(ScreenSpaceX, ScreenSpaceY, Yheight)
            DoesntCollide = false
        }
        else if (blockState == 8) {
            LastBlockState = 8
            basic.pause(100)
            // animation
            DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, level)
            led.plotBrightness(ScreenSpaceX, ScreenSpaceY - 2, 255)
            led.plotBrightness(ScreenSpaceX-1, ScreenSpaceY-2, 255)
            basic.pause(300)

            DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, level)
            led.plotBrightness(ScreenSpaceX, ScreenSpaceY - 1, 255)
            led.plotBrightness(ScreenSpaceX - 1, ScreenSpaceY - 1, 255)
            basic.pause(1000)

            // finish
            if (LavaEnabled) {
                currLavaLevel    = LavaLevel
                currLavaCooldown = LavaCooldown
            }
            ShowInvis = false
            RunningLevel = deepArrayCopy(LevelUntouched)
            DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, RunningLevel)
            TeleportPlayer(LevelStartX, LevelStartY, PlayerStartX, PlayerStartY)
            DoesntCollide = false
        }
        else if (blockState == 2) {
            if (LastBlockState != 2) {
                ShowInvis = !ShowInvis
                currInvisCooldown = InvisCooldown
            }

            LastBlockState = 2
            DoesntCollide = false
        }
        else if (blockState == 6 && !ShowInvis) {
            LastBlockState = 6
            DoesntCollide = true
            // override
            continue
        }
        else if (blockState == 11 && ShowInvis) {
            LastBlockState = 11
            DoesntCollide = true
            // override
            continue
        }
        // default
        else if (blockState == 1 || blockState > BlockStateCount) {
            LastBlockState = 1
            DoesntCollide = false
        }
        
    }
    return DoesntCollide
}
function JumpPlayer(XWorldPos: number, YWorldPos: number, Yheight: number, level: Array<Array<number>>) {
    if (GravityPause <= 0) {
        if (CheckCollisionPlayer(XWorldPos, YWorldPos - 2, 1, level)) {
            if (!CheckCollisionPlayer(XWorldPos, YWorldPos + 1, 1, level)) {
                PlayerY -= PlayerJumpForce
                GravityPause += PlayerJumpDuration
            }
        }
    }
}
function TeleportPlayer(Xlevel: number, Ylevel: number, Xplayer: number, Yplayer: number) {
    LevelX = Xlevel
    LevelY = Ylevel
    PlayerX = Xplayer
    PlayerY = Yplayer
    GravityPause = 2
}

let PlayerStartX = 0
let PlayerStartY = 0
let PlayerX = PlayerStartX
let PlayerY = PlayerStartY
let PlayerHeight = 2
let PlayerJumpForce = 1
let PlayerJumpDuration = 6
let GravityPause = 0

let playerXworldspace = LevelX + PlayerX
let playerYworldspace = LevelY + PlayerY

// https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
function deepArrayCopy(arr: Array<any>): Array<any> {
    return JSON.parse(JSON.stringify(arr))
}

function PlayLevel(level: Array<Array<number>>) {
    LevelComplete  = false
    LevelUntouched = deepArrayCopy(level)
    RunningLevel   = deepArrayCopy(level)

    while (!LevelComplete) {
        MoveLevel(RunningLevel)
        key = keyNo

        PlayerY += GravityPlayer(playerXworldspace, playerYworldspace, RunningLevel)

        DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, RunningLevel)
        DrawPlayer(PlayerX, PlayerY, PlayerHeight)
        basic.pause(100)
    }
    LevelComplete = false
}

function Play() {
    let StartTime = input.runningTime()

    LevelStartX = 0
    LevelStartY = 3
    LevelX = LevelStartX
    LevelY = LevelStartY

    PlayerStartX = 2
    PlayerStartY = -1
    PlayerX = PlayerStartX
    PlayerY = PlayerStartY

    PlayLevel(Level0)

    basic.clearScreen()
    basic.pause(300)

    LevelStartX = 0
    LevelStartY = 2
    LevelX = LevelStartX
    LevelY = LevelStartY

    PlayerStartX = 2
    PlayerStartY = 3
    PlayerX = PlayerStartX
    PlayerY = PlayerStartY

    PlayLevel(Level1)

    basic.clearScreen()
    basic.pause(300)

    LevelStartX = 0
    LevelStartY = 5
    LevelX = LevelStartX
    LevelY = LevelStartY

    PlayerStartX = 2
    PlayerStartY = 3
    PlayerX = PlayerStartX
    PlayerY = PlayerStartY
    PlayLevel(Level2)

    basic.clearScreen()
    basic.pause(300)

    LevelStartX = 0
    LevelStartY = 11
    LevelX = LevelStartX
    LevelY = LevelStartY

    PlayerStartX = 2
    PlayerStartY = 2
    PlayerX = PlayerStartX
    PlayerY = PlayerStartY

    LavaEnabled      = true
    LavaLevel        = Level3.length - 1
    currLavaLevel    = Level3.length - 1
    LavaCooldown     = 40
    currLavaCooldown = 10

    PlayLevel(Level3)
    LavaEnabled = false

    let SpeedRunStat = (input.runningTime() - StartTime) / 1000
    basic.clearScreen()
    basic.pause(1000)
    images.iconImage(IconNames.Yes).showImage(0, 2000)
    basic.clearScreen()
    basic.pause(1000)
    serial.writeValue("Time", SpeedRunStat)
    basic.showNumber(SpeedRunStat)
}

control.inBackground(function() {
    basic.forever( () => {
        if (input.buttonIsPressed(Button.AB)) {
            if (currkeyABCheck > 0) {
                currkeyABCheck -= 1
            } else {
                key = Button.AB
                currkeyABCheck = keyABCheck
            }
        }
        else if (input.buttonIsPressed(Button.A)) {
            if (currkeyACheck > 0) {
                currkeyACheck -= 1
            } else {
                key = Button.A
                currkeyACheck = keyACheck
            }
        }
        else if (input.buttonIsPressed(Button.B)) {
            if (currkeyBCheck > 0) {
                currkeyBCheck -= 1
            } else {
                key = Button.B
                currkeyBCheck = keyBCheck
            }
        }
        basic.pause(5)
    } )
})
let keyNo: Button
let key = keyNo
let keyACheck      = 2
let currkeyACheck  = keyACheck
let keyBCheck      = 2
let currkeyBCheck  = keyBCheck
let keyABCheck     = 0
let currkeyABCheck = keyABCheck


function StartScreen() {
    key = keyNo
    while (key == keyNo) {
        ShowInvis = true
        DrawLevel(0, 0, LevelXlen, LevelYheight, StartScreenLevel)
        basic.pause(1000)
        ShowInvis = false
        DrawLevel(0, 0, LevelXlen, LevelYheight, StartScreenLevel)
        basic.pause(1000)
    }
    key = keyNo
    Play()
}
let StartScreenLevel = [
    [1, 9, 9, 9, 1],
    [1, 9, 9, 9, 1],
    [0, 0, 0, 0, 0],
    [0, 6, 6, 6, 0],
    [0, 0, 0, 3, 3]
]
function LogoIntro() {
    let introLevel = [
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ]
    pause(1000)
    for (let bright = 0; bright < 256; bright++) {
        DrawLevel(0, 0, 5, 5, introLevel, bright)
        basic.pause(10)
    }
    pause(500)
    basic.clearScreen()
}

LogoIntro()
basic.forever(() => {
    serial.writeString("Starting")
    serial.writeString(".")
    serial.writeString(".")
    serial.writeString(".")

    basic.clearScreen()
    StartScreen()
})