import AbilityScoreSetter from "./AbilityScoreSetter";
import useLocalStorage from "../../hooks/useLocalStorage";
import styled from "styled-components";
import { useState } from "react";
import { Link } from 'react-router-dom';
import routes from "../../data/routes";
import { forwardRef } from "react";

const AbilityScores = forwardRef((props, ref) => {

    const totalPoints = 6;
    const [availablePoints, setAvailablePoints] = useLocalStorage(
        'character-creation-ability-score-pool',
        totalPoints
    );
    const [errMsg, setErrMsg] = useState('')

    return (
        <section ref={ref}>
            <h4>Distribute Ability Scores</h4>
            {errMsg &&
                <ErrorMessage>{errMsg}</ErrorMessage>
            }
            <AvailablePointsLabel>
                Available Points:
                <AvailablePointsSpan>
                    {availablePoints}
                </AvailablePointsSpan>
            </AvailablePointsLabel>
            <AbilityScoreSetter
                name="meat"
                description="A measure of your physical ability"
                availablePoints={availablePoints}
                setAvailablePoints={setAvailablePoints}
                errMsg={errMsg}
                setErrMsg={setErrMsg}
            />
            <AbilityScoreSetter
                name="leet"
                description="A measure of your mental ability"
                availablePoints={availablePoints}
                setAvailablePoints={setAvailablePoints}
                errMsg={errMsg}
                setErrMsg={setErrMsg}
            />
            <AbilityScoreSetter
                name="street"
                description="A measure of your social ability"
                availablePoints={availablePoints}
                setAvailablePoints={setAvailablePoints}
                errMsg={errMsg}
                setErrMsg={setErrMsg}
            />

            <nav>
                <Link className="prev" to={routes.characterCreation}>BACK</Link>

                {availablePoints == 0 && 
                    <Link className="next" to={routes.characterCreation + "3"}>NEXT</Link>
                }
            </nav>
        </section>
    )
})

const AvailablePointsLabel = styled.p`
    margin-left: 1.5em;
    margin-top: -0.5;
    padding: 0em;
    font-style: italic;
    color: var(--faint-color);
`;

const AvailablePointsSpan = styled.span`
    color: var(--fg-color);
    margin-left: 5px;
`;

const ErrorMessage = styled.p`
    margin-top: 5px;
    background-color: var(--faint-color);
    position: absolute;
    font-size: 0.8rem;
    padding: 0.4rem;
    border: 3px dashed var(--bg-color);
    color: var(--bg-color);
`;

export default AbilityScores


