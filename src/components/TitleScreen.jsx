import { forwardRef } from "react";
import { Button } from "../styles/Button";
import { Link } from "react-router-dom";
import routes from "../data/routes";

const TitleScreen = forwardRef((props, ref) => {

    return (
        <section ref={ref}>

            <div className="orbit-wrapper">
                <div className="planet-graphic"></div>
                <div className="space-station"></div>
            </div>
            <div>
                <h2>Name of the Game</h2>
                <Link to={routes.characterCreation}>
                    <Button>New Game</Button>
                </Link><br />

                    <Button disabled>Continue</Button>
                <br />

            </div>
        </section>
    )
})

export default TitleScreen