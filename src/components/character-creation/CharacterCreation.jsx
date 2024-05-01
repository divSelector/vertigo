import AbilityScores from "./AbilityScores";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AuraSelection from "./AuraSelection";
import routes from "../../data/routes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import '../../styles/transitions.css';
import { useRef } from "react";
import SocialContactPicker from "./SocialContactPicker";
import NameAndPronouns from "./NameAndPronouns";

const AnimatedCharacterCreationPages = () => {

    const location = useLocation(); 
    const nodeRef = useRef(null);

    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="slide" timeout={200} nodeRef={nodeRef}>
                {/* The timeout must match the times in transitions.css */}
                <Routes>
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
                        <NameAndPronouns ref={nodeRef} />
                    } />

                </Routes>
            </CSSTransition>
        </SwitchTransition>
    );
};

function CharacterCreation() {

    return (
        <>
            <div>
                <h2>Character Creation</h2>
                <BrowserRouter>
                    <AnimatedCharacterCreationPages />
                </BrowserRouter>
            </div>
        </>
    )
}

export default CharacterCreation