export class Sound {
    constructor() { }

    play(soundId, volume, loop = false) {
        const sound = document.getElementById(soundId)
        sound.volume = volume
        sound.loop = loop
        sound.play()
    }

    overlapPlay(soundId, volume, loop = false) {
        const sound = document.getElementById(soundId)
        const cloneSound = sound.cloneNode()
        cloneSound.volume = volume
        cloneSound.loop = loop
        cloneSound.play()
    }
}