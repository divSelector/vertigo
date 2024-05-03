import audio from "../game/Audio";
import { forwardRef } from "react";
import { Row } from "../styles/Layout";
import { Button } from "../styles/Button";
import styled from "styled-components";
import audioManifest from "../assets/audio/manifest";

const AudioTest = forwardRef((props, ref) => {

    const playBGMusic = () => {
        audio.playBackgroundMusic(audioManifest.NEON_WORLD);
    };

    const toggleEventMusic = () => {
        if (!audio.currentEventAudio) audio.playEventMusic(audioManifest.W96_ALONEARMED);
        else audio.stopEventMusic()
    }

    const playSound = () => {
        audio.playSound(audioManifest.SOUND)
    }

    return (
        <section ref={ref}>

            <Row style={{width: '80%', marginBottom: '-1em'}}>
                <h3 style={{marginRight: '3em'}}>Audio </h3>

                <AudioTestButton onClick={playBGMusic}>Start BGM</AudioTestButton><br />
                <AudioTestButton onClick={toggleEventMusic}>Toggle Event</AudioTestButton><br />
                <AudioTestButton onClick={playSound}>Play SFX</AudioTestButton><br />
            </Row>
        </section>
    )
})

const AudioTestButton = styled(Button)`
    font-size: 80%;
`;

export default AudioTest