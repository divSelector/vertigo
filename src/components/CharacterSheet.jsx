import styled from "styled-components";
import { getColorName, getBrightName } from "../game/Aura";
import useDrag from "../hooks/useDrag";
import { NameLabel } from "./CharacterNameLabel";

const CharacterSheet = ({ character }) => {

    const { position, dragMouseDown } = useDrag();

    const spacer = () => <tr><th></th><td colSpan="2"></td></tr>

    return (
        <div className="character-sheet-container"
             style={{ position: 'absolute', top: position.y, left: position.x }}
             onMouseDown={dragMouseDown}
        >
            <table className="character-sheet">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>
                            <NameLabel hue={character.aura.hue}>{character.name}</NameLabel>
                            <i>{character.description}</i>
                            <div id="pagin-container"></div>
                        </td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>{character.gender}</td>
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