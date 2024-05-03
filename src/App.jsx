import AuraSelection from "./components/character-creation/AuraSelection";
import AbilityScores from "./components/character-creation/AbilityScores";
import SocialContactPicker from "./components/character-creation/SocialContactPicker";
import NameSelection from "./components/character-creation/NameSelection";
import { ThemeProvider } from "./context/theme";
import Aura from "./game/Aura";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import routes from "./data/routes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import './styles/transitions.css';
import { useRef } from "react";
import TitleScreen from "./components/TitleScreen";
import OptionsLink from "./components/options/OptionsLink";

const AnimatedPages = () => {

  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <CSSTransition key={location.key} classNames="slide" timeout={200} nodeRef={nodeRef}>
        {/* The timeout must match the times in transitions.css */}
        <Routes>
          <Route exact path={'/'} element={
            <TitleScreen ref={nodeRef} />
          } />
          <Route path={routes.characterCreation} element={
            <AuraSelection ref={nodeRef} />
          } />
          <Route path={routes.characterCreation + "2"} element={
            <AbilityScores ref={nodeRef} />
          } />
          <Route path={routes.characterCreation + "3"} element={
            <SocialContactPicker ref={nodeRef} />
          } />
          <Route path={routes.characterCreation + "4"} element={
            <NameSelection ref={nodeRef} />
          } />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
};

function App() {

  window.Aura = Aura;

  return (
    <>
      <ThemeProvider>
        <OptionsLink />
        <BrowserRouter>
          <AnimatedPages />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
