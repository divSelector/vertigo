import { forwardRef, useEffect } from "react";
import SpaceStationOrbitingPlanet from "./graphic/SpaceStationOrbitingPlanet";
import { MainMenu } from "./TitleScreen";
import { usePlayer } from "../context/player";
import { Button } from "../styles/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Continue = forwardRef((props, ref) => {

    const { getPlayerData, switchPlayer, activePlayerId } = usePlayer();
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
                <StyledLink className="prev" to={"/"} position="left">BACK</StyledLink>
                {activePlayerId !== 'character-creation' &&
                    <StyledLink className="next" to={"/"} position="right">NEXT</StyledLink>
                }
            </NavAbsolutePosition>
        </section>
    )
});


const NavAbsolutePosition = styled.nav`
    position: relative;
    margin-top: -70px;
`;

const StyledLink = styled(Link)`
    position: absolute;
    bottom: 5%;
    ${props => props.position}: 0;
    margin: 0 10px;
`;

export default Continue;