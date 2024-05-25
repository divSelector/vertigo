import { forwardRef } from "react"
import { Link } from "react-router-dom";
import routes from "../../data/routes";
import { TextInput } from "../../styles/TextInput";
import { CharacterNameLabel } from "../CharacterNameLabel";
import usePopup from "../../hooks/usePopup";
import { PopupContainer } from "../../styles/Layout";
import PopupContent from "../popup/PopupContent";
import { usePlayer } from "../../context/player";

const NameSelection = forwardRef((props, ref) => {

    const { getPlayerData } = usePlayer();
    const { name, setName, selectedContact } = getPlayerData();

    const { showPopup, popupPosition, popupRef, handleClick, position, dragMouseDown } = usePopup();
    const { showPopup: showPopup2,
            popupPosition: popupPosition2,
            popupRef: popupRef2,
            handleClick: handleClick2,
            position: position2,
            dragMouseDown: dragMouseDown2 } = usePopup();

    const handleNameChange = event => {
        const newValue = event.target.value.slice(0, 20)
        setName(newValue)
    }

    return (
        <section ref={ref}>
            <h2>Character Creation</h2>
            <h4>What is your name?</h4>
            <TextInput
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
            />

            <hr />
            <br />
            <p>"Hey, <span style={{ color: 'var(--faint-color)' }}>{name ? name : "_"}</span>. I know this probably isn't the position you wanted and that you're qualified to do a lot more than this, but I'd hate to find out you had to get on a shuttle <span className="popup-link" onClick={handleClick}>back to Earth</span>. My word goes a long way here at Vertico and it's not that bad when you consider <span className="popup-link" onClick={handleClick2}>the benefits.</span>"</p>
            <p>"Just put me down as a reference and you're definitely in. Let me know when you've sent the application and I'll make a phone call."</p>
            <br />
            <span style={{ float: 'right' }}>- an email from <CharacterNameLabel character={selectedContact} /></span>
            <nav>
                <Link className="prev" to={routes.characterCreation + "3"}>BACK</Link>

                {name &&
                    <Link className="next" to={routes.characterCreation + "5"}>NEXT</Link>
                }
            </nav>

            {showPopup && (
                <PopupContainer
                    top={popupPosition.top}
                    left={popupPosition.left}
                    ref={popupRef}
                    centeradjust={window.innerWidth < 400 ? window.innerWidth / 2 : 200}
                >
                    <BackToEarthPopupContent position={position} dragMouseDown={dragMouseDown} />
                </PopupContainer>
            )}

            {showPopup2 && (
                <PopupContainer
                    top={popupPosition2.top}
                    left={popupPosition2.left}
                    ref={popupRef2}
                    centeradjust={window.innerWidth < 400 ? window.innerWidth / 2 : 200}
                >
                    <TheBenefitsPopupContent position={position2} dragMouseDown={dragMouseDown2} />
                </PopupContainer>
            )}

        </section>
    )
})

function BackToEarthPopupContent({ position, dragMouseDown }) {
    return (
        <PopupContent position={position} dragMouseDown={dragMouseDown}>
            <p className="popup-content">
                Earth, now veiled in toxic clouds, barely resembles its former self; its surface obscured and hostile, discourages any return.
            </p>
        </PopupContent>
    );
}

function TheBenefitsPopupContent({ position, dragMouseDown }) {
    return (
        <PopupContent position={position} dragMouseDown={dragMouseDown}>
            <p className="popup-content">
                Staying employed ensures resource access and avoids the hardships of Earth; connections are key to navigating limited opportunities.
            </p>
        </PopupContent>
    );
}

export default NameSelection;