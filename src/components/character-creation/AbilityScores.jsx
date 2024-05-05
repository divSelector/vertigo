import AbilityScoreSetter from "./AbilityScoreSetter";
import useLocalStorage from "../../hooks/useLocalStorage";
import styled from "styled-components";
import { useState } from "react";
import { Link } from 'react-router-dom';
import routes from "../../data/routes";
import { forwardRef } from "react";
import { Container, Row } from "../../styles/Layout";
import { jobTitleMap, jobDescriptionMap } from "../../data/game";
import { usePlayer } from "../../context/player";

const AbilityScores = forwardRef((props, ref) => {

    const totalPoints = 6;
    const [availablePoints, setAvailablePoints] = useLocalStorage(
        'character-creation-ability-score-pool',
        totalPoints
    );

    const { getPlayerData } = usePlayer();
    const { meat, leet, street, setMeat, setLeet, setStreet } = getPlayerData();

    const jobTitle = getJobTitleFromAbilityScores({meat, leet, street})

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
                        score={meat}
                        setScore={setMeat}
                    />
                    <AbilityScoreSetter
                        name="leet"
                        description="mental ability"
                        availablePoints={availablePoints}
                        setAvailablePoints={setAvailablePoints}
                        errMsg={errMsg}
                        setErrMsg={setErrMsg}
                        score={leet}
                        setScore={setLeet}
                    />
                    <AbilityScoreSetter
                        name="street"
                        description="social ability"
                        availablePoints={availablePoints}
                        setAvailablePoints={setAvailablePoints}
                        errMsg={errMsg}
                        setErrMsg={setErrMsg}
                        score={street}
                        setScore={setStreet}
                    />
                </AbilityScoresContainer>
                <Text>
                    <p>Ability scores are key attributes that define your character's strengths and weaknesses. Use the <code>+</code> and <code>-</code> buttons to spend all of your available points. When you have no points remaining you may proceed to the next screen.</p>
                    <p>The point distribution will affect your work experience and the type of role you are suitable for.</p>
                    <hr /><br />
                    <h3 className="byline">{jobTitle}</h3>
                    <blockquote className="right" style={{fontSize: '80%', textAlign: 'left'}}>{jobDescriptionMap && jobDescriptionMap[jobTitle]}</blockquote>
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

export const getJobTitleFromAbilityScores = (scores) => {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topScore = sortedScores[0][1];
    const secondScore = sortedScores[1][1];
    const lowestScore = sortedScores[2][1];

    let jobTitle;
    if (topScore === 1 && secondScore === 1 && lowestScore === 1) {
        jobTitle = 'Unemployable';
    } else if (topScore - secondScore > 5) {  
        // Significantly high top score indicates min/maxing
        // These jobs ae supposed to be more undesirable to reward players for not min/maxing.
        switch (sortedScores[0][0]) {
            case 'meat':
                jobTitle = 'Factory Worker';
                break;
            case 'leet':
                jobTitle = 'Data Entry Clerk';
                break;
            case 'street':
                jobTitle = 'Telemarketer';
                break;
            default:
                jobTitle = 'General Worker';  // Fallback
        }
    } else if (secondScore === lowestScore || secondScore === topScore) {
        jobTitle = 'General Worker';  // Equal stats indicate less specialization
    } else {
        const jobKey = `${sortedScores[0][0]}+${sortedScores[1][0]}`;
        jobTitle = jobTitleMap[jobKey] || 'General Worker';  // Normal case, balanced skills
    }

    return jobTitle
}

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


