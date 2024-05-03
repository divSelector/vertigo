import styled from "styled-components";

const Endnote = ({ isVisible, onClose, height, children }) => {
    return (
        <EndnoteContainer className="endnote" isvisible={isVisible ? "visible" : ""}>
            <div className="entry" style={{height: height ? height : 'unset'}}>
                {children}
            </div>
            <a className="ui" onClick={onClose}>
                X
            </a>
        </EndnoteContainer>
    );
};

const EndnoteContainer = styled.div`
  display: ${props => (props.isvisible ? 'block' : 'none')};
  z-index: 99999;
`;

export default Endnote;