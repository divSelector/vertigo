import { Link } from 'react-router-dom';
import game from "../../data/game";
import routes from "../../data/routes";
import { useTheme } from "../../context/theme";
import { forwardRef } from 'react';
import Aura from '../../game/Aura';
import CharacterSheet from '../CharacterSheet';

const SocialContactPicker = forwardRef((props, ref) => {

    const { hue, bright } = useTheme();

    const playerAura = new Aura(hue, bright)

    const getRandomBright = () => {
        return Math.floor(Math.random() * 20) + 1;
    }

    let socialContactAuras = [];
    let socialContactHue;
    for (let i = 0; i < 4; i++) {
        socialContactHue = playerAura.getRandomComplementaryHueInRange()
        socialContactAuras.push(new Aura(socialContactHue, getRandomBright()))
    }

    console.log(socialContactAuras)

    return (
        <section ref={ref}>
            <h4>Select a Social Contact</h4>

            {socialContactAuras.map((aura, index) => (
                <CharacterSheet key={index} aura={aura} />
            ))}

            <nav>
                <Link className="prev" to={routes.characterCreation + "2"}>BACK</Link>

                {/* {availablePoints == 0 &&
                    <Link className="next" to={routes.characterCreation + "4"}>NEXT</Link>
                } */}
            </nav>
        </section>
    )
})

export default SocialContactPicker;
