import useLocalStorage from "../../hooks/useLocalStorage";
import { Button } from "../../styles/Button";
import styled from 'styled-components';
import { ContainerNoSelect, Row } from "../../styles/Layout";

const AbilityScoreSetter = ({ name, description, availablePoints, setAvailablePoints, errMsg, setErrMsg, score, setScore }) => {

    const showErrorMessage = (msg, timer = 1500) => {
        if (errMsg == "") {
            setErrMsg(msg)
            setTimeout(() => {
                setErrMsg("")
            }, timer)
        }
    }

    const increment = () => {
        if (availablePoints > 0) {
            setScore(score + 1);
            setAvailablePoints(availablePoints - 1);
        } else {
            showErrorMessage("Slow down there, broke bitch. You got no points.")
        }
    };

    const decrement = () => {
        if (score > 1) {
            setScore(score - 1);
            setAvailablePoints(availablePoints + 1);
        } else {
            showErrorMessage("A score of less than 1 is nonexistance, pal.")
        }
    };

    return (
        <>
            <ContainerNoSelect>
                <Row>
                    <Label>{name}</Label>
                    <Value>{score}</Value>
                    <Button onClick={decrement}>-</Button>
                    <Button onClick={increment}>+</Button>
                </Row>
                <Description>{description}</Description>
            </ContainerNoSelect>
        </>

    );
};

const Label = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 1rem;
    color: var(--faint-color);
`;

const Value = styled.p`
    font-size: 2rem;
    margin-right: 1rem;
    color: var(--faint-color);
`;

const Description = styled.p`
    font-size: 0.7rem;
    margin-left: auto;
`;

export default AbilityScoreSetter;