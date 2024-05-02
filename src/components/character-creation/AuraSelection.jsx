import { Link } from 'react-router-dom';
import { SliderContainer, SliderInput } from "../../styles/Slider";
import game from "../../data/game";
import routes from "../../data/routes";
import { useTheme } from "../../context/theme";
import { forwardRef } from 'react';
import { getColorName, getBrightName } from '../../game/Aura';
import useLocalStorage from '../../hooks/useLocalStorage';

const AuraSelection = forwardRef((props, ref) => {

    const { hue, bright, updateHue, updateBright } = useTheme();

    const [socialContactOptions, setSocialContactOptions] = useLocalStorage(
        'character-creation-random-social-contact-options',
        []
    );
    const [selectedContact, setSelectedContact] = useLocalStorage('character-creation-selected-contact', null)

    const handleHueChange = (event) => {
        const newHue = parseInt(event.target.value);
        setSocialContactOptions([])
        setSelectedContact(null)
        updateHue(newHue)
    }

    const handleBrightChange = (event) => {
        const newBright = parseInt(event.target.value);
        updateBright(newBright)
    }

    return (
        <section ref={ref}>
            <h2>Character Creation</h2>
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
                <Link className="prev" to={"/"}>BACK</Link>
                <Link className="next" to={routes.characterCreation + "2"}>NEXT</Link>
            </nav>
        </section>
    )
})

export default AuraSelection;