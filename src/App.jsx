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
import { PlayerProvider } from "./context/player";
import JobOffer from "./components/character-creation/JobOffer";
import Continue from "./components/Continue";
import CampaignOne1 from "./components/campaign/1/1";

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
          <Route exact path={routes.continue} element={
            <Continue ref={nodeRef} />
          } />

          {/* Character Creation Routes */}

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
          <Route path={routes.characterCreation + "5"} element={
            <JobOffer ref={nodeRef} />
          } />

          {/* Campaign 1 Routes */}
          <Route path={routes.campaign1} element={
            <CampaignOne1 />
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
        <PlayerProvider>
          <OptionsLink />
          <BrowserRouter>
            <AnimatedPages />
          </BrowserRouter>
        </PlayerProvider>
      </ThemeProvider>
    </>
  )
}

export default App
