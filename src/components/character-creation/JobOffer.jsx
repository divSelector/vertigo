import { forwardRef } from "react"
import { usePlayer } from "../../context/player";
import { Link } from "react-router-dom";
import routes from "../../data/routes";
import { getJobTitleFromAbilityScores } from "./AbilityScores";
import usePopup from "../../hooks/usePopup";
import { PopupContainer } from "../../styles/Layout";
import PopupContent from "../popup/PopupContent";


const JobOffer = forwardRef((props, ref) => {

    const { getPlayerData, saveNewPlayer, switchPlayer } = usePlayer();
    const { name, meat, leet, street } = getPlayerData()

    const { showPopup, popupPosition, popupRef, handleClick, position, dragMouseDown } = usePopup();

    const renderRoleComment = () => {
        const role = getJobTitleFromAbilityScores({ meat, leet, street });
        switch (role) {
            case 'Factory Worker':
            case 'Data Entry Clerk':
            case 'Telemarketer':
            case 'General Worker':
                return <> While you are not entirely qualified for this role</>
            default:
                return <> While this role may not be what you initially envisioned</>;
        }
    }

    const handleSavePlayer = () => {
        saveNewPlayer(name)
        switchPlayer(name)
    }

    return (
        <section ref={ref}>
            <h2>Character Creation</h2>
            <h4>Subject: Your Opportunity at Vertico</h4>
            <hr />
            <p>Dear <span style={{ color: 'var(--faint-color)' }}>{name}</span>,</p>
            <p className="indent">Congratulations on your offer! We are excited to welcome you to Vertico Corporation as
                a <span className="popup-link" onClick={handleClick}>Sanitation and Environmental Stewardship Engineer</span> at our
                Orbital Research Facility (ORF). </p>

            <p className="indent">{renderRoleComment()}, we believe it is a valuable opportunity to contribute to our organization
                and gain insight into our operations.</p>
            <p className="indent">Please note that ORF is a secure environment. You will be required to undergo a clearance test before starting your duties. This is to
                ensure the safety and confidentiality of our operations.</p>
            <p className="indent">Best regards,</p>
            <p className="byline right">[Vertico Corporation]</p>
            <nav>
                <Link className="prev" to={routes.characterCreation + "4"}>BACK</Link>
                <Link className="next" onClick={handleSavePlayer} to={"/"}>SAVE</Link>
            </nav>

            {showPopup && (
                <PopupContainer
                    top={popupPosition.top}
                    left={popupPosition.left}
                    ref={popupRef}
                    centeradjust={window.innerWidth < 400 ? window.innerWidth / 2 : 200}
                >
                    <JanitorPopupContent position={position} dragMouseDown={dragMouseDown} />
                </PopupContainer>
            )}

        </section>
    )
})

function JanitorPopupContent({ position, dragMouseDown }) {
    return (
        <PopupContent position={position} dragMouseDown={dragMouseDown}>
            <p className="popup-content">
                Responsible for ensuring cleanliness and hygiene standards, waste management, and environmental sustainability within the facility -- a janitor.
            </p>
        </PopupContent>
    );
}


export default JobOffer;