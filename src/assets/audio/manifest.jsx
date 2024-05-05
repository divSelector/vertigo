const audioDir = '/src/assets/audio';

const audioManifest = {
    NEON_WORLD: {
        src: audioDir + '/bgm/neon_world.mp3',
        volume: 0.75
    },
    W96_ALONEARMED: {
        src: audioDir + '/event/W96_ALONEARMED.mp3',
        volume:  1.0
    },
    SPACE: {
        src: audioDir + '/bgm/space.flac',
        volume: 0.85
    },
    SOUND: {
        src: audioDir + '/sfx/sound.flac',
        volume: 5.0
    },
    TOTHEGREATBEYOND: {
        src: audioDir + '/bgm/stellardrone-tothegreatbeyond.ogg',
        volume: 0.75
    },
    SLOWSPACE: {
        src: audioDir + '/bgm/efence-slowspace.webm',
        volume: 0.75
    }
}

export default audioManifest;