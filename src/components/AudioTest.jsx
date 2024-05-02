import audio from "../game/Audio";
import { forwardRef } from "react";

const AudioTest = forwardRef((props, ref) => {

    const playBGMusic = () => {
        audio.playBackgroundMusic('/src/assets/audio/bgm/neon_world.mp3', 0.75);
    };

    const toggleEventMusic = () => {
        if (!audio.currentEventAudio) audio.playEventMusic('/src/assets/audio/event/W96_ALONEARMED.mp3', 1.0);
        else audio.stopEventMusic()
    }

    const playSound = () => {
        audio.playSound('/src/assets/audio/sfx/sound.flac', 3.0)

        audio.setMasterVolume(2.0, 0)
    }

    return (
        <section ref={ref}>
            <div>
                <h2>Audio Test</h2>

                    <button onClick={playBGMusic}>Start Background Music</button><br />
                    <button onClick={toggleEventMusic}>Toggle Event Music</button><br />
                    <button onClick={playSound}>Play Sound Effect</button><br />
            </div>
        </section>
    )
})

export default AudioTest