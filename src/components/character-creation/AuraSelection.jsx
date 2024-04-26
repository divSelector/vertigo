import { Link } from 'react-router-dom';
import { SliderContainer, SliderInput } from "../../styles/Slider";
import game from "../../data/game";
import routes from "../../data/routes";
import { useTheme } from "../../context/theme";
import { forwardRef } from 'react';


const AuraSelection = forwardRef((props, ref) => {

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
            { range: [0, 20], name: 'Red' },
            { range: [20, 30], name: 'Vermilion' },
            { range: [30, 36], name: 'Orange' },
            { range: [36, 43], name: 'Amber' },
            { range: [43, 65], name: 'Yellow' },
            { range: [65, 80], name: 'Olive' },
            { range: [80, 90], name: 'Puke Green' },
            { range: [90, 110], name: 'Chartreuse Green' },
            { range: [110, 130], name: 'Green' },
            { range: [130, 148], name: 'Spring Green' },
            { range: [148, 180], name: 'Cyan' },
            { range: [180, 210], name: 'Azure' },
            { range: [210, 260], name: 'Blue' },
            { range: [260, 290], name: 'Purple' },
            { range: [290, 310], name: 'Magenta' },
            { range: [310, 322], name: 'Pink' },
            { range: [322, 330], name: 'Rose' },
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
        <section ref={ref}>
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
            <p>{bright} {hue}</p>

            <hr />
            <p>Every character in {game.name} including non player characters have an aura. For lack of a better word, this is a measurement of how likely you are to get along with the people around you. Obviously, effort can be put into building better relationships with any type of person. Similarly, you can alienate someone with a similar aura to yours through your actions. But characters who have similar auras will <i style={{color:'var(--faint-color)'}}>get</i> each other more easily.</p>


            <nav>
                <Link className="next" to={routes.characterCreation + "2"}>NEXT</Link>
            </nav>
        </section>
    )
})

export default AuraSelection;