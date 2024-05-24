import { forwardRef, useEffect } from "react";
import SpaceStationOrbitingPlanet from "./graphic/SpaceStationOrbitingPlanet";
import { MainMenu } from "./TitleScreen";
import { usePlayer } from "../context/player";
import { Button } from "../styles/Button";
import { Link } from "react-router-dom";

const Continue = forwardRef((props, ref) => {

    const { getPlayerData, switchPlayer } = usePlayer();
    const { saveFiles } = getPlayerData();

    return (
        <section ref={ref}>
            <SpaceStationOrbitingPlanet />
            <MainMenu>
                <h2 style={{ zIndex: '100' }}>Continue</h2>
                {saveFiles.map((playerId, index) => {
                    return <Button key={index} onClick={() => switchPlayer(playerId)} >{playerId}</Button>
                })}
                <br />
            </MainMenu>
            <NavAbsolutePosition>
                <Link className="prev" to={"/"}>BACK</Link>
            </NavAbsolutePosition>
        </section>
    )
});

const NavAbsolutePosition = styled.nav`
    position: absolute;
    bottom: '5%';
`;

export default Continue;