import AbilityScores from "./AbilityScores";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AuraSelection from "./AuraSelection";
import routes from "../../data/routes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import '../../styles/transitions.css';

const AnimatedCharacterCreationPages = () => {

    const location = useLocation();
    
    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="slide" timeout={200}>
                {/* The timeout must match the times in transitions.css */}
                <Routes>
                    <Route path={routes.characterCreation} element={
                        <AuraSelection />
                    } />
                    <Route path={routes.characterCreation + "2"} element={
                        <AbilityScores />
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