import CharacterCreation from "./components/character-creation/CharacterCreation";
import { ThemeProvider } from "./context/theme";

function App() {

  return (
    <>
      <ThemeProvider>
        <CharacterCreation />
      </ThemeProvider>
    </>
  )
}

export default App


