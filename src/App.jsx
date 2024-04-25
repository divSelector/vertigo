import AbilityScores from "./components/character-creation/AbilityScores";
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
        <AbilityScores />
      </div>
    </div>
    </>
  )
}

export default App


