namespace SpriteKind {
    export const allybullet = SpriteKind.create()
    export const enemybullet = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . 5 1 1 5 . . . . . . 
        . . . . . . 5 1 1 5 . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, face_X * 300, face_Y * 300)
    projectile.setKind(SpriteKind.allybullet)
    projectile.startEffect(effects.fire, 500)
    scene.cameraShake(4, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemybullet, function (sprite, otherSprite) {
    statusbar.value += -10
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
})
function enemy () {
    mySprite2 = sprites.create(img`
        . . . . . . 3 3 . . . . . . . . 
        . . . . . . 3 3 . . . . . . . . 
        . . . . . . 3 3 . . . . . . . . 
        . . . . . . 3 3 . . . . . . . . 
        a b 8 8 . c 5 5 8 . a 4 8 8 . . 
        3 b b 3 b a b 5 8 8 8 4 a a . . 
        c c b b 3 b b b b 8 8 8 8 8 . . 
        3 b a b 3 b a a b 8 8 4 a a . . 
        c c b b b a b 8 b b 8 8 8 8 . . 
        3 b a b b b b b b b 8 4 a a . . 
        c c b b b b b b b b 8 8 8 8 . . 
        3 b a b b b b b b b 8 4 a a . . 
        c c b b b b 3 b a b 8 8 8 8 . . 
        3 b a b b a a a a b 8 4 a a . . 
        c c a 3 3 b a a b 8 8 8 8 8 . . 
        3 b a a . . . . . . d 4 a a . . 
        `, SpriteKind.Enemy)
}
scene.onHitWall(SpriteKind.allybullet, function (sprite, location) {
    tiles.setWallAt(location, false)
    sprites.destroy(sprite)
    tiles.setTileAt(location, sprites.castle.tilePath5)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
})
function start () {
    tiles.setCurrentTilemap(tilemap`level3`)
    mySprite = sprites.create(assets.image`myImage1`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    mySprite.setStayInScreen(true)
    scene.cameraFollowSprite(mySprite)
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.value = 100
    statusbar.attachToSprite(mySprite)
}
let mySprite2: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let projectile: Sprite = null
let face_Y = 0
let face_X = 0
face_X = 0
face_Y = 0
start()
game.onUpdateInterval(2000, function () {
    scene.followPath(mySprite2, scene.aStar(tiles.locationOfSprite(mySprite2), tiles.locationOfSprite(mySprite)), 50)
})
game.onUpdateInterval(100, function () {
    if (mySprite.vx > 0) {
        mySprite.setImage(assets.image`myImage0`)
        face_X = 1
        face_Y = 0
    } else if (mySprite.vx < 0) {
        mySprite.setImage(assets.image`myImage2`)
        face_X = -1
        face_Y = 0
    } else if (mySprite.vy < 0) {
        mySprite.setImage(assets.image`myImage`)
        face_X = 0
        face_Y = -1
    } else if (mySprite.vy > 0) {
        mySprite.setImage(assets.image`myImage1`)
        face_X = 0
        face_Y = 1
    }
})
