import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from 'react-router-dom';
import { SliderContainer, SliderInput } from "../../styles/Slider";
import game from "../../data/game";
import routes from "../../data/routes";
import { useTheme } from "../../context/theme";

function AuraSelection() {

    const { hue, bright, updateHue, updateBright } = useTheme();

    const handleHueChange = (event) => {
        const newHue = parseInt(event.target.value);
        updateHue(newHue)
    }

    const handleBrightChange = (event) => {
        const newBright = parseInt(event.target.value);
        updateBright(newBright)
    }

    function getColorName(hue) {
        const colors = [
            { range: [0, 25], name: 'Red' },
            { range: [25, 45], name: 'Orange' },
            { range: [45, 80], name: 'Yellow' },
            { range: [80, 90], name: 'Puke Green' },
            { range: [90, 150], name: 'Green' },
            { range: [150, 180], name: 'Blue Green' },
            { range: [180, 210], name: 'Cyan' },
            { range: [210, 250], name: 'Blue' },
            { range: [250, 290], name: 'Purple' },
            { range: [290, 330], name: 'Pink' },
            { range: [330, 360], name: 'Red' },
        ];

        const colorObj = colors.find(color => hue >= color.range[0] && hue < color.range[1]);
        return colorObj ? colorObj.name : 'Invalid hue value';
    }

    function getBrightName(brightness) {
        const brightnessLevels = [
            { range: [0, 2], name: 'Pitch Dark' },
            { range: [3, 7], name: 'Dimly Lit' },
            { range: [8, 12], name: 'Soft Glow' },
            { range: [13, 17], name: 'Radiant' },
            { range: [18, 20], name: 'Star Bright' },
        ];

        const levelObj = brightnessLevels.find(level => brightness >= level.range[0] && brightness <= level.range[1]);
        return levelObj ? levelObj.name : 'Invalid brightness value';
    }

    return (
        <section>
            <h4>Slide the Bars To Find Your Aura</h4>

            <SliderContainer>
                <SliderInput
                    type="range"
                    min="0"
                    max="359"
                    value={hue}
                    onChange={handleHueChange}
                />
            </SliderContainer>

            <SliderContainer>
                <SliderInput
                    type="range"
                    min="0"
                    max="20"
                    value={bright}
                    onChange={handleBrightChange}
                />
            </SliderContainer>

            <h3 style={{
                color: 'var(--faint-color)',
                marginTop: '3rem'
            }}>
                {getBrightName(bright)} {getColorName(hue)}
            </h3>
            {/* <p>{bright} {hue}</p> */}

            <hr />
            <p>Every character in {game.name} including non player characters have an aura. For lack of a better word, this is a measurement of how likely you are to get along with the people around you. Obviously, effort can be put into building better relationships with any type of person. Similarly, you can alienate someone with a similar aura to yours through your actions. But characters who have similar auras will <i style={{color:'var(--faint-color)'}}>get</i> each other more easily.</p>


            <nav>
                <Link className="next" to={routes.characterCreation + "2"}>NEXT</Link>
            </nav>
        </section>
    )
}

export default AuraSelection;