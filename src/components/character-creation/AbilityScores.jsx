import AbilityScoreSetter from "./AbilityScoreSetter";
import useLocalStorage from "../../hooks/useLocalStorage";
import styled from "styled-components";
import { useState } from "react";
import { Link } from 'react-router-dom';
import routes from "../../data/routes";
import { forwardRef } from "react";
import { Container, Row } from "../../styles/Layout";

const AbilityScores = forwardRef((props, ref) => {

    const totalPoints = 6;
    const [availablePoints, setAvailablePoints] = useLocalStorage(
        'character-creation-ability-score-pool',
        totalPoints
    );
    const [errMsg, setErrMsg] = useState('')

    return (
        <section ref={ref}>
            <h2>Character Creation</h2>
            <h4>Distribute Ability Scores</h4>

            <AvailablePointsLabel>
                Available Points:
                <AvailablePointsSpan>
                    {availablePoints}
                </AvailablePointsSpan>
            </AvailablePointsLabel>

            <AbilityScoresRow>
                <AbilityScoresContainer>
                    <AbilityScoreSetter
                        name="meat"
                        description="physical ability"
                        availablePoints={availablePoints}
                        setAvailablePoints={setAvailablePoints}
                        errMsg={errMsg}
                        setErrMsg={setErrMsg}
                    />
                    <AbilityScoreSetter
                        name="leet"
                        description="mental ability"
                        availablePoints={availablePoints}
                        setAvailablePoints={setAvailablePoints}
                        errMsg={errMsg}
                        setErrMsg={setErrMsg}
                    />
                    <AbilityScoreSetter
                        name="street"
                        description="social ability"
                        availablePoints={availablePoints}
                        setAvailablePoints={setAvailablePoints}
                        errMsg={errMsg}
                        setErrMsg={setErrMsg}
                    />
                </AbilityScoresContainer>
                <Text>
                    <p>Ability scores are key attributes that define your character's strengths and weaknesses. Use the <code>+</code> and <code>-</code> buttons to spend all of your available points. When you have no points remaining you may proceed to the next screen.</p>
                    <p>In the future I will probably have more advice about how to spend these points.</p>
                </Text>
            </AbilityScoresRow>
            {errMsg &&
                <ErrorMessage>{errMsg}</ErrorMessage>
            }
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
    left: 50%;
    transform: translateX(-50%);
`;

const breakpoint = '524px'

const AbilityScoresContainer = styled(Container)`
    margin-right: 2rem;
    
    @media (max-width: ${breakpoint}) {
        margin-right: auto;
        margin-left: auto;
    }
`;

const AbilityScoresRow = styled(Row)`
    align-items: flex-start;

    @media (max-width: ${breakpoint}) {
        flex-direction: column-reverse;
        align-items: flex-start;
    }
`;

const Text = styled.div`
    align-self: flex-start;
`;


export default AbilityScores


