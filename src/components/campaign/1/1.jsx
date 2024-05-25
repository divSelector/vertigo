import { forwardRef } from "react"
import { Link } from "react-router-dom";
import routes from "../../../data/routes";
import useMultiplePopups from "../../../hooks/useMultiplePopups";
import Popup from "../../popup/Popup";


const CampaignOne1 = forwardRef((props, ref) => {

    const markupPopup = text => <p className="popup-content">{text}</p>

    const popupContents = [
        {
            triggerText: "Nova Haven",
            content: markupPopup("Explain some stuff about Nova Haven"),
        },
        {
            triggerText: "Orbitex Enterprises",
            content: markupPopup("Explain some stuff about Orbitex Enterprises"),
        },
        {
            triggerText: "Orbital Research Facility",
            content: markupPopup("Explain some stuff about Orbital Research Facility"),
        },
        {
            triggerText: "Vertico Corporation",
            content: markupPopup("Explain some stuff about Vertico Corporation"),
        },
    ];

    const popups = useMultiplePopups(popupContents.length);

    const linkPopup = idx => <>
        <span className="popup-link" onClick={popups[idx].handleClick}>
            {popupContents[idx].triggerText}
        </span>
    </>

    return (
        <section ref={ref}>
            <h2></h2>
            <h4></h4>
            <hr />
            <p>You board the shuttle, a sleek, metallic vessel, its cold surfaces reflecting the harsh lights
                of {linkPopup(0)}. The emblem of {linkPopup(1)} is emblazoned on the walls, a reminder of the world you are leaving behind.</p>

            <p>The hum of the engines grows louder as the shuttle detaches from the station, and your stomach churns with unease. Through the small
                window, you catch a final glimpse of the station that has been your home.</p>

            <p>Ahead lies the {linkPopup(2)}, run by {linkPopup(3)} —- an entity once considered a rival, now your new overseer. The weight
                of uncertainty settles heavily on your shoulders.</p>
            <hr />

            <nav>
                <Link className="prev" to={'/'}>BACK</Link>
                <Link className="next" to={routes.campaign1 + '2'}>NEXT</Link>
            </nav>

            {popups.map((popup, index) => (
                <Popup key={index} {...popup}>
                    {popupContents[index].content}
                </Popup>
            ))}

        </section>
    )
})

export default CampaignOne1;
