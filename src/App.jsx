import CharacterCreation from "./components/character-creation/CharacterCreation";
import { ThemeProvider } from "./context/theme";

import Aura from "./game/Aura";

function App() {

  window.Aura = Aura;

  return (
    <>
      <ThemeProvider>
        <CharacterCreation />
      </ThemeProvider>
    </>
  )
}

export default App


