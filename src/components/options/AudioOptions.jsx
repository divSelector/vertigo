import audio from "../../game/Audio"
import { SliderContainer, SliderInput } from "../../styles/Slider"
import useLocalStorage from "../../hooks/useLocalStorage";
import AudioTest from "../AudioTest";
import { Row } from "../../styles/Layout";

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
            <Row style={{marginBottom: '0'}}>
                <h4 style={{marginRight: '3em'}}>Volume</h4>
                <SliderContainer style={{width: '100%'}}>
                    <SliderInput
                        type="range"
                        min="0"
                        max="100"
                        value={masterVolume}
                        onChange={handleMasterVolumeChange}
                    />
                </SliderContainer>
            </Row>
        </>
    )
}