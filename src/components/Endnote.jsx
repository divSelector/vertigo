import styled from "styled-components";

const Endnote = ({ isVisible, onClose, children }) => {
    return (
        <EndnoteContainer className="endnote" isvisible={isVisible ? "visible" : ""}>
            <div className="entry">
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
`;

export default Endnote;