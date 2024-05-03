import { forwardRef } from "react";
import { Button } from "../styles/Button";
import { Link } from "react-router-dom";
import routes from "../data/routes";
import game from "../data/game";
import SpaceStationOrbitingPlanet from "./graphic/SpaceStationOrbitingPlanet";
import styled from "styled-components";
import audio from "../game/Audio";
import audioManifest from "../assets/audio/manifest";

const TitleScreen = forwardRef((props, ref) => {

    const handleNewGame = (e) => {
        audio.stopEventMusic();
        audio.playBackgroundMusic(audioManifest.NEON_WORLD);
    }

    return (
        <section ref={ref}>

            <SpaceStationOrbitingPlanet />
            <MainMenu>
                <h2>{game.name}</h2>
                <Link to={routes.characterCreation}>
                    <Button onClick={handleNewGame}>New Game</Button>
                </Link><br />
                <Button disabled>Continue</Button>
                <br />
            </MainMenu>

        </section >
    )
})

export const MainMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export default TitleScreen