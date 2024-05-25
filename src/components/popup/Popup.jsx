import { PopupContainer } from "../../styles/Layout";
import PopupContent from "./PopupContent";

const Popup = ({ showPopup, popupPosition, popupRef, position, dragMouseDown, children }) => {
    if (!showPopup) return null;

    return (
        <PopupContainer
            top={popupPosition.top}
            left={popupPosition.left}
            ref={popupRef}
            centeradjust={window.innerWidth < 400 ? window.innerWidth / 2 : 200}
        >
            <PopupContent position={position} dragMouseDown={dragMouseDown}>
                {children}
            </PopupContent>
        </PopupContainer>
    );
};

export default Popup;