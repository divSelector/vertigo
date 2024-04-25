import useLocalStorage from "../hooks/useLocalStorage";
import { Button } from "../styles/Button";
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -2.0rem;
`;

export const Label = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
`;

export const Value = styled.p`
  font-size: 2rem;
  margin-right: 1rem;
  color: var(--faint-color);
`;

export const Description = styled.p`
  font-size: 0.7rem;
  text-align: center;
`;

const AbilityScoreSetter = ({ name, description, availablePoints, setAvailablePoints }) => {

    const storageKey = 'character-creation-ability-score-' + name
    const [count, setCount] = useLocalStorage(storageKey, 1);

    const increment = () => {
        if (availablePoints > 0) {
          setCount(count + 1);
          setAvailablePoints(availablePoints - 1);
        }
      };
    
      const decrement = () => {
        if (count > 1) {
          setCount(count - 1);
          setAvailablePoints(availablePoints + 1);
        }
      };

    return (
        <>
            <Container>
                <Row>
                    <Label>{name}</Label>
                    <Value>{count}</Value>
                    <Button onClick={decrement}>-</Button>
                    <Button onClick={increment}>+</Button>
                </Row>
                <Description>{description}</Description>
            </Container>
            
        </>

    );
};

export default AbilityScoreSetter;