import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { getColorName, getBrightName } from "../game/Aura";


const CharacterSheet = ({ character }) => {

    const description = "dfs fdsf dsf dsffd sfds fd dsf fdsf dsf sf  fdsf dsf ds dds ds dsf dsf dsf dsfd sf dsf dsf dsf sf dsfd sfdsf dsf dsfd fds "

    const spacer = () => <tr><th></th><td colSpan="2"></td></tr>

    return (
        <div className="character-sheet-container">
            <table className="character-sheet">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>
                            <NameLabel hue={character.aura.hue}>{character.name}</NameLabel>
                            <i>{description}</i>
                            <div id="pagin-container"></div>
                        </td>
                    </tr>
                    {spacer()}
                    <tr>
                        <th>Aura</th>
                        <AuraLabel hue={character.aura.hue} bright={character.aura.bright} colSpan={2}>
                            <span>{getBrightName(character.aura.bright)}</span>
                            <span>{getColorName(character.aura.hue)}</span>
                        </AuraLabel>
                    </tr>
                    <tr>
                        <th>Company</th>
                        <td>{character.company}</td>
                    </tr>
                    <tr>
                        <th>Job Title</th>
                        <td>{character.jobTitle}</td>
                    </tr>
                    {/* <tr>
                        <th>Definitions</th>
                        <td colSpan="2">
                            <ol>
                                <li>A long word.</li>
                                <li>A person who uses long words.</li>
                            </ol>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};


const CharacterNameLabelContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CharacterSheetPopup = styled.div`
  position: fixed;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 100vw;
  z-index: 1000;
`;

export const CharacterNameLabel = ({ character }) => {
    const [showSheet, setShowSheet] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0 });
    const popupRef = useRef(null);

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect(); // Get bounding rect of clicked element
        const clickY = e.clientY - rect.top;
        setShowSheet(true);
        setPopupPosition({ top: clickY + rect.top });
    };

    const handleClickOutside = (e) => {
        console.log("Click outside called")
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            console.log("if block condition met")
            setShowSheet(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <CharacterNameLabelContainer>
            <div>
                <NameLabel hue={character.aura.hue} onClick={handleClick}>
                    {character.name}
                </NameLabel>
            </div>

            {showSheet && (
                <CharacterSheetPopup top={popupPosition.top} ref={popupRef} >
                    <CharacterSheet character={character} />
                </CharacterSheetPopup>
            )}
        </CharacterNameLabelContainer>
    );
};

const NameLabel = styled.div`
    background-color: ${({ hue }) => `hsl(${hue}, 100%, 10%)`};
    border: 1px solid ${({ hue }) => `hsl(${hue}, 100%, 80%)`};
    color: ${({ hue }) => `hsl(${hue}, 100%, 90%)`};
    text-align: center;
    padding: 0.3em 0.5em;
    margin-right: 0.3em;
    font-weight: normal;
    width: 95%;
`;

const AuraLabel = styled.td`
    padding-top: 0;
    padding-bottom: 0;

    & > span {
        display: inline-block;
        background: ${({ hue }) => `hsl(${hue}, 70%, 60%)`};
        padding: 0.1em 0.3em;
        margin: 0.1em 0;
        border-radius: 5px 0 5px 0;
        clip-path: polygon(0.5em 0, 100% 0, calc(100% - 0.5em) 100%, 0 100%);
    }

    & > span:first-child {
        background: ${({ hue, bright }) => `hsl(${hue}, 70%, ${bright}%)`};
        color: ${({ hue }) => `hsl(${hue}, 70%, 80%)`};
        font-weight: bold;
        clip-path: polygon(0 0, 100% 0, calc(100% - 0.5em) 100%, 0 100%);
    }

    & > span:last-child {
        color: ${({ hue }) => `hsl(${hue}, 70%, 20%)`};
        clip-path: polygon(0.5em 0, 100% 0, 100% 100%, 0 100%);
        font-weight: bold;
    }

    & > span:not(:last-child) {
        padding-right: 0.6em;
        margin-right: -0.2em;
    }

    & > span:not(:first-child) {
        padding-left: 0.6em;
        margin-left: -0.2em;
    }
`;


export default CharacterSheet;