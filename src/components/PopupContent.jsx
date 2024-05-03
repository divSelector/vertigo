function PopupContent({ children, position, dragMouseDown }) {
    return (
        <div className="popup-container"
            style={{ position: 'absolute', top: position.y, left: position.x }}
            onMouseDown={dragMouseDown}
        >
            {children}
        </div>
    );
}

export default PopupContent;