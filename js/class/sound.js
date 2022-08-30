export class Sound {
    constructor() { }

    play(soundId, volume, loop = false) {
        var sound = document.getElementById(soundId)
        sound.volume = volume
        sound.loop = loop
        sound.play()
    }
}