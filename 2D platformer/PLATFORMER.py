# init
led.set_display_mode(DisplayMode.GREYSCALE)
def DrawLevel(Xpos: number, Ypos: number, Xlen: number, Yheight: number, level: Array, brightness: number):
    global ShowInvis
    if LavaEnabled:
        DrawLava(level)
    y = 0
    while y < Yheight:
        x = 0
        while x < Xlen:
            if brightness:
                led.plot_brightness(x,
                    y,
                    level[Ypos + y][Xpos + x] % BlockStateCount * brightness)
            elif level[Ypos + y][Xpos + x] == 6 and not ShowInvis:
                led.plot_brightness(x, y, 0)
            elif level[Ypos + y][Xpos + x] == 11 and ShowInvis:
                led.plot_brightness(x, y, 0)
            elif level[Ypos + y][Xpos + x] != 6 or ShowInvis:
                led.plot_brightness(x,
                    y,
                    level[Ypos + y][Xpos + x] % BlockStateCount * Multiplicant)
            x += 1
        y += 1
def MoveLevel(level2: Array):
    global playerXworldspace, playerYworldspace, LevelX
    playerXworldspace = LevelX + PlayerX
    playerYworldspace = LevelY + PlayerY
    if key == Button.A and CheckCollisionPlayer(playerXworldspace - 1,
        playerYworldspace,
        PlayerHeight,
        level2):
        LevelX -= 1
    if key == Button.B and CheckCollisionPlayer(playerXworldspace + 1,
        playerYworldspace,
        PlayerHeight,
        level2):
        LevelX += 1
    if key == Button.AB:
        JumpPlayer(playerXworldspace, playerYworldspace, PlayerHeight, level2)
BlockStateCount = 5
LastBlockState = 0
Multiplicant = 255 / BlockStateCount
Level0 = [
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
Level1 = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 13, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
Level2 = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 13, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 3],
    [0, 13, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
Level3 = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 13, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
LevelStartX = 0
LevelStartY = 0
LevelX = LevelStartX
LevelY = LevelStartY
LevelXlen = 5
LevelYheight = 5
LevelComplete = False
def DrawLava(level3: Array):
    global currLavaCooldown, currLavaLevel
    if currLavaCooldown > 0:
        currLavaCooldown -= 1
    else:
        for i in range(len(level3[currLavaLevel])):
            level3[currLavaLevel][i] = 8
        currLavaLevel -= 1
        currLavaCooldown = LavaCooldown
LavaEnabled = False
LavaLevel = 0
currLavaLevel = LavaLevel
LavaCooldown = 0
currLavaCooldown = LavaCooldown
def DrawInvisBlocks(level4: Array):
    if ShowInvis:
        pass
ShowInvis = False
InvisCooldown = 10
currInvisCooldown = InvisCooldown
def DrawPlayer(Xpos2: number, Ypos2: number, Yheight2: number):
    for y2 in range(Yheight2):
        led.plot_brightness(Xpos2, Ypos2 - y2, 255)
def GravityPlayer(Xpos3: number, Ypos3: number, level5: Array):
    global GravityPause, LevelY
    # Level[Ypos + 1][Xpos] == 0
    if GravityPause > 0:
        GravityPause -= 1
        return 0
    # stay in screen
    if PlayerY < 2:
        LevelY -= 1
        return 1
    if PlayerY > 3:
        LevelY += 1
        return -1
    if not CheckCollisionPlayer(Xpos3, Ypos3, PlayerHeight, level5):
        return -1
    if CheckCollisionPlayer(Xpos3, Ypos3 + 1, PlayerHeight, level5):
        return 1
    return 0
def CheckCollisionPlayer(Xnext: number, Ynext: number, Yheight3: number, level6: Array):
    global LastBlockState, LevelComplete, currLavaLevel, currLavaCooldown, ShowInvis, RunningLevel, currInvisCooldown
    DoesntCollide = True
    ScreenSpaceX = Xnext - LevelX
    ScreenSpaceY = Ynext - LevelY
    for y3 in range(Yheight3):
        # if in bounds
        if Ynext - y3 < 0 or Ynext - y3 > len(level6):
            DoesntCollide = False
        # block specific
        blockState = level6[Ynext - y3][Xnext]
        # default
        if blockState == 3:
            LastBlockState = 3
            LevelComplete = True
            DoesntCollide = False
        elif blockState == 9:
            LastBlockState = 9
            basic.clear_screen()
            basic.pause(300)
            TeleportPlayer(LevelStartX, LevelStartY, PlayerStartX, PlayerStartY)
            DoesntCollide = False
        elif blockState == 4:
            LastBlockState = 4
            # animation
            led.plot_brightness(ScreenSpaceX, ScreenSpaceY - y3, 0)
            led.plot_brightness(ScreenSpaceX,
                ScreenSpaceY - Yheight3,
                4 % BlockStateCount * Multiplicant)
            basic.pause(1000)
            CurrLevelX = LevelX
            for j in range(20):
                Xoffset = randint(-1, 1)
                Yoffset = randint(-1, 1)
                DrawLevel(CurrLevelX + Xoffset,
                    LevelY,
                    LevelXlen - Xoffset,
                    LevelYheight,
                    level6)
                basic.pause(50)
            # finish
            level6[Ynext - y3][Xnext] = 0
            level6[Ynext][Xnext] = 0
            DrawLevel(CurrLevelX, LevelY, LevelXlen, LevelYheight, level6)
            DrawPlayer(ScreenSpaceX, ScreenSpaceY, Yheight3)
            DoesntCollide = False
        elif blockState == 8:
            LastBlockState = 8
            basic.pause(100)
            # animation
            DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, level6)
            led.plot_brightness(ScreenSpaceX, ScreenSpaceY - 2, 255)
            led.plot_brightness(ScreenSpaceX - 1, ScreenSpaceY - 2, 255)
            basic.pause(300)
            DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, level6)
            led.plot_brightness(ScreenSpaceX, ScreenSpaceY - 1, 255)
            led.plot_brightness(ScreenSpaceX - 1, ScreenSpaceY - 1, 255)
            basic.pause(1000)
            # finish
            if LavaEnabled:
                currLavaLevel = LavaLevel
                currLavaCooldown = LavaCooldown
            ShowInvis = False
            RunningLevel = deepArrayCopy(LevelUntouched)
            DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, RunningLevel)
            TeleportPlayer(LevelStartX, LevelStartY, PlayerStartX, PlayerStartY)
            DoesntCollide = False
        elif blockState == 2:
            if LastBlockState != 2:
                ShowInvis = not ShowInvis
                currInvisCooldown = InvisCooldown
            LastBlockState = 2
            DoesntCollide = False
        elif blockState == 6 and not ShowInvis:
            LastBlockState = 6
            DoesntCollide = True
            # override
            continue
        elif blockState == 11 and ShowInvis:
            LastBlockState = 11
            DoesntCollide = True
            # override
            continue
        elif blockState == 1 or blockState > BlockStateCount:
            LastBlockState = 1
            DoesntCollide = False
    return DoesntCollide
def JumpPlayer(XWorldPos: number, YWorldPos: number, Yheight4: number, level7: Array):
    global PlayerY, GravityPause
    if GravityPause <= 0:
        if CheckCollisionPlayer(XWorldPos, YWorldPos - 2, 1, level7):
            if not CheckCollisionPlayer(XWorldPos, YWorldPos + 1, 1, level7):
                PlayerY -= PlayerJumpForce
                GravityPause += PlayerJumpDuration
def TeleportPlayer(Xlevel: number, Ylevel: number, Xplayer: number, Yplayer: number):
    global LevelX, LevelY, PlayerX, PlayerY, GravityPause
    LevelX = Xlevel
    LevelY = Ylevel
    PlayerX = Xplayer
    PlayerY = Yplayer
    GravityPause = 2
PlayerStartX = 0
PlayerStartY = 0
PlayerX = PlayerStartX
PlayerY = PlayerStartY
PlayerHeight = 2
PlayerJumpForce = 1
PlayerJumpDuration = 6
GravityPause = 0
playerXworldspace = LevelX + PlayerX
playerYworldspace = LevelY + PlayerY
# https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
def deepArrayCopy(arr: Array):
    return JSON.parse(JSON.stringify(arr))
def PlayLevel(level8: Array):
    global LevelComplete, LevelUntouched, RunningLevel, key, PlayerY
    LevelComplete = False
    LevelUntouched = deepArrayCopy(level8)
    RunningLevel = deepArrayCopy(level8)
    while not LevelComplete:
        MoveLevel(RunningLevel)
        key = keyNo
        PlayerY += GravityPlayer(playerXworldspace, playerYworldspace, RunningLevel)
        DrawLevel(LevelX, LevelY, LevelXlen, LevelYheight, RunningLevel)
        DrawPlayer(PlayerX, PlayerY, PlayerHeight)
        basic.pause(100)
    LevelComplete = False
def Play():
    global LevelStartX, LevelStartY, LevelX, LevelY, PlayerStartX, PlayerStartY, PlayerX, PlayerY, LavaEnabled, LavaLevel, currLavaLevel, LavaCooldown, currLavaCooldown
    StartTime = input.running_time()
    LevelStartX = 0
    LevelStartY = 3
    LevelX = LevelStartX
    LevelY = LevelStartY
    PlayerStartX = 2
    PlayerStartY = -1
    PlayerX = PlayerStartX
    PlayerY = PlayerStartY
    PlayLevel(Level0)
    basic.clear_screen()
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
    basic.clear_screen()
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
    basic.clear_screen()
    basic.pause(300)
    LevelStartX = 0
    LevelStartY = 11
    LevelX = LevelStartX
    LevelY = LevelStartY
    PlayerStartX = 2
    PlayerStartY = 2
    PlayerX = PlayerStartX
    PlayerY = PlayerStartY
    LavaEnabled = True
    LavaLevel = len(Level3) - 1
    currLavaLevel = len(Level3) - 1
    LavaCooldown = 40
    currLavaCooldown = 10
    PlayLevel(Level3)
    LavaEnabled = False
    SpeedRunStat = (input.running_time() - StartTime) / 1000
    basic.clear_screen()
    basic.pause(1000)
    images.icon_image(IconNames.YES).show_image(0, 2000)
    basic.clear_screen()
    basic.pause(1000)
    serial.write_value("Time", SpeedRunStat)
    basic.show_number(SpeedRunStat)

def on_in_background():
    
    def on_forever():
        global currkeyABCheck, key, currkeyACheck, currkeyBCheck
        if input.button_is_pressed(Button.AB):
            if currkeyABCheck > 0:
                currkeyABCheck -= 1
            else:
                key = Button.AB
                currkeyABCheck = keyABCheck
        elif input.button_is_pressed(Button.A):
            if currkeyACheck > 0:
                currkeyACheck -= 1
            else:
                key = Button.A
                currkeyACheck = keyACheck
        elif input.button_is_pressed(Button.B):
            if currkeyBCheck > 0:
                currkeyBCheck -= 1
            else:
                key = Button.B
                currkeyBCheck = keyBCheck
        basic.pause(5)
    basic.forever(on_forever)
    
control.in_background(on_in_background)

key = keyNo
keyACheck = 2
currkeyACheck = keyACheck
keyBCheck = 2
currkeyBCheck = keyBCheck
keyABCheck = 0
currkeyABCheck = keyABCheck
def StartScreen():
    global key, ShowInvis
    key = keyNo
    while key == keyNo:
        ShowInvis = True
        DrawLevel(0, 0, LevelXlen, LevelYheight, StartScreenLevel)
        basic.pause(1000)
        ShowInvis = False
        DrawLevel(0, 0, LevelXlen, LevelYheight, StartScreenLevel)
        basic.pause(1000)
    key = keyNo
    Play()
StartScreenLevel = [[1, 9, 9, 9, 1],
    [1, 9, 9, 9, 1],
    [0, 0, 0, 0, 0],
    [0, 6, 6, 6, 0],
    [0, 0, 0, 3, 3]]
def LogoIntro():
    introLevel = [[0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]]
    pause(1000)
    for bright in range(256):
        DrawLevel(0, 0, 5, 5, introLevel, bright)
        basic.pause(10)
    pause(500)
    basic.clear_screen()
LogoIntro()

def on_forever2():
    serial.write_string("Starting")
    serial.write_string(".")
    serial.write_string(".")
    serial.write_string(".")
    basic.clear_screen()
    StartScreen()
basic.forever(on_forever2)
