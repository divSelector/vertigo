import { forwardRef } from "react"
import { Link } from "react-router-dom";
import routes from "../../../data/routes";

const CampaignOne3 = forwardRef((props, ref) => {

    return (
        <section ref={ref}>
            <h2></h2>
            <h4></h4>
            <hr />
            <p>The Vertico commander frowns as he scans the data pad. "This can't be right," he mutters, his eyes narrowing. "We're paying too much for this transfer." He glances up, suspicion etched across his face.</p>
            <p>The Orbitex commander holds his ground, expression unwavering. "Those are the terms we were given," he replies firmly. "You'll find everything is in order."</p>
            <p>A tense silence hangs in the air.</p>

            <hr />
            <p>What... don't tell me you thought this was finished. LUL.</p>


            <nav>
                <Link className="prev" to={routes.campaign1 + '2'}>BACK</Link>
                <Link className="next" to={'/'}>GAME OVER</Link>
            </nav>

        </section>
    )
})

export default CampaignOne3;
