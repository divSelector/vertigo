import styled from "styled-components";
import { useState } from "react";
import { getColorName, getBrightName } from "../game/Aura";


const CharacterSheet = ({ aura }) => {

    const name = "sdfdsfsd"
    const description = "sdfdsfsdfdf"

    const [hue, setHue] = useState(aura.hue);
    const [bright, setBright] = useState(aura.bright);

    const spacer = () => <tr><th></th><td colSpan="2"></td></tr>

    return (
        <div className="character-sheet-container">
            <table className="character-sheet">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>
                            <NameLabel hue={hue}>{name}</NameLabel>
                            <i>{description}</i>
                            <div id="pagin-container"></div>
                        </td>
                    </tr>
                    {spacer()}
                    <tr>
                        <th>Aura</th>
                        <AuraLabel hue={hue} bright={bright} colSpan={2}>
                            <span>{getBrightName(aura.bright)}</span>
                            <span>{getColorName(aura.hue)}</span>
                        </AuraLabel>
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

const NameLabel = styled.span`
    background-color: ${({ hue }) => `hsl(${hue}, 100%, 10%)`};
    border: 1px solid ${({ hue }) => `hsl(${hue}, 100%, 80%)`};
    color: ${({ hue }) => `hsl(${hue}, 100%, 90%)`};
    text-align: center;
    padding: 0.3em 0.5em;
    margin-right: 0.3em;
    font-weight: normal;
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