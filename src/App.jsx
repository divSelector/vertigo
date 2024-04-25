import AbilityScoreSetter from "./components/AbilityScoreSetter"
import useLocalStorage from "./hooks/useLocalStorage";
import styled from "styled-components";

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

function App() {

  const totalPoints = 8;
  const [availablePoints, setAvailablePoints] = useLocalStorage(
    'character-creation-ability-score-pool', 
    totalPoints
  );

  return (
    <>
    <div>
      <h2>Character Creation</h2>
      <div>
        <p className="byline">
          Available Points: 
          <AvailablePointsSpan>
            {availablePoints}
          </AvailablePointsSpan>
        </p>
        <AbilityScoreSetter
          name="meat"
          description="A measure of your physical ability"
          availablePoints={availablePoints}
          setAvailablePoints={setAvailablePoints}
        />
        <AbilityScoreSetter
          name="leet"
          description="A measure of your mental ability"
          availablePoints={availablePoints}
          setAvailablePoints={setAvailablePoints}
        />
        <AbilityScoreSetter
          name="street"
          description="A measure of your social ability"
          availablePoints={availablePoints}
          setAvailablePoints={setAvailablePoints}
        />
      </div>
    </div>
    </>
  )
}

export default App


