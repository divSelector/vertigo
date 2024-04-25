import AbilityScores from "./AbilityScores";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AuraSelection from "./AuraSelection";
import routes from "../../data/routes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import '../../styles/transitions.css';

const AnimatedSwitch = () => {
    const location = useLocation();
    console.log("location", location);
    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="slide" timeout={200}>
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
                    <AnimatedSwitch />
                </BrowserRouter>
            </div>
        </>
    )
}

export default CharacterCreation