import { forwardRef } from "react"
import { Link } from "react-router-dom";
import routes from "../../../data/routes";

const CampaignOne2 = forwardRef((props, ref) => {

    return (
        <section ref={ref}>
            <h2></h2>
            <h4></h4>
            <hr />
            <p>The shuttle docks with a jolt at the intermediary station, a stark, utilitarian structure floating in the void. As the hatch opens, you're greeted by the sight of two security teams standing on opposite sides of the docking bay.</p>
            <p>Orbitex guards in their familiar blue uniforms flank one side, their faces stern and unyielding. Opposite them, Vertico enforcers in sharp, black attire stand equally rigid. The air is thick with tension, like a cold war standoff.</p>
            <p>You step forward, feeling the eyes of both teams on you. The Orbitex commander hands over a data pad to his Vertico counterpart, and you realize there is no turning back.</p>
            <hr/ >
            <nav>
                <Link className="prev" to={routes.campaign1}>BACK</Link>
                <Link className="next" to={routes.campaign1 + '3'}>NEXT</Link>
            </nav>

        </section>
    )
})

export default CampaignOne2;
