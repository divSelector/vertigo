import usePopup from "../hooks/usePopup";
import { PopupContainer } from "../styles/Layout";
import styled from "styled-components";
import CharacterSheet from "./CharacterSheet";

export const CharacterNameLabel = ({ character }) => {
    const { showPopup, popupPosition, popupRef, handleClick } = usePopup();

    return (
        <CharacterNameLabelContainer>
            <div>
                <NameLabel hue={character.aura.hue} onClick={handleClick}>
                    {character.name}
                </NameLabel>
            </div>

            {showPopup && (
                <PopupContainer 
                    top={popupPosition.top} 
                    left={popupPosition.left} 
                    ref={popupRef}
                    centeradjust={window.innerWidth < 400 ? window.innerWidth/2 : 200}
                >
                    <CharacterSheet character={character} />
                </PopupContainer>
            )}
        </CharacterNameLabelContainer>
    );
};

const CharacterNameLabelContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const NameLabel = styled.div`
    background-color: ${({ hue }) => `hsl(${hue}, 100%, 10%)`};
    border: 1px solid ${({ hue }) => `hsl(${hue}, 100%, 80%)`};
    color: ${({ hue }) => `hsl(${hue}, 100%, 90%)`};
    text-align: center;
    padding: 0.3em 0.5em;
    margin-right: 0.3em;
    font-weight: normal;
    width: 95%;
    cursor: pointer;
`;