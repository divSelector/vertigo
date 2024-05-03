import audio from "../../game/Audio"
import { SliderContainer, SliderInput } from "../../styles/Slider"
import useLocalStorage from "../../hooks/useLocalStorage";
import { forwardRef } from "react";
import { Row } from "../../styles/Layout";
import { Button } from "../../styles/Button";
import styled from "styled-components";
import audioManifest from "../../assets/audio/manifest";

export default function AudioOptions() {

    const [masterVolume, setMasterVolume] = useLocalStorage('options-master-volume', 100);

    const handleMasterVolumeChange = (e) => {
        const newVolume = e.target.value / 100;
        setMasterVolume(e.target.value);
        audio.setMasterVolume(newVolume, 0);
    };

    return (
        <>
            <AudioTest />
            <AudioTestRow style={{marginBottom: '0'}}>
                <h4 style={{marginRight: '3em'}}>Volume</h4>
                <SliderContainer style={{width: '100%', margin: '0 auto'}}>
                    <SliderInput
                        type="range"
                        min="0"
                        max="100"
                        value={masterVolume}
                        onChange={handleMasterVolumeChange}
                    />
                </SliderContainer>
            </AudioTestRow>
        </>
    )
}

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

            <AudioTestRow style={{width: '80%', marginBottom: '1em'}}>
                <h3 style={{marginRight: '3em'}}>Audio </h3>

                <AudioTestButton onClick={playBGMusic}>Start BGM</AudioTestButton><br />
                <AudioTestButton onClick={toggleEventMusic}>Toggle Event</AudioTestButton><br />
                <AudioTestButton onClick={playSound}>Play SFX</AudioTestButton><br />
            </AudioTestRow>
        </section>
    )
})

const AudioTestButton = styled(Button)`
    font-size: 80%;
`;

const AudioTestRow = styled(Row)`
    @media (max-width: 390px) {
        flex-direction: column;
        align-items: normal;
    }
`;
