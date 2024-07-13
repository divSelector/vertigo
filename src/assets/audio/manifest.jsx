const audioFiles = import.meta.glob('/src/assets/audio/**/*.{mp3,flac,ogg,webm}', { eager: true });

const audioDir = '/src/assets/audio';

const audioManifest = {
    NEON_WORLD: {
        src: audioFiles[audioDir + '/bgm/neon_world.mp3'].default,
        volume: 0.75
    },
    W96_ALONEARMED: {
        src: audioFiles[audioDir + '/event/W96_ALONEARMED.mp3'].default,
        volume: 1.0
    },
    SPACE: {
        src: audioFiles[audioDir + '/bgm/space.flac'].default,
        volume: 0.85
    },
    SOUND: {
        src: audioFiles[audioDir + '/sfx/sound.flac'].default,
        volume: 5.0
    },
    TOTHEGREATBEYOND: {
        src: audioFiles[audioDir + '/bgm/stellardrone-tothegreatbeyond.ogg'].default,
        volume: 0.75
    },
    SLOWSPACE: {
        src: audioFiles[audioDir + '/bgm/efence-slowspace.webm'].default,
        volume: 0.75
    }
}

export default audioManifest;