import styled from "styled-components";

export const TextInput = styled.input`
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    text-decoration: none;
    color: #000;
    cursor: text;
    border: 3px solid;
    padding: 0.25em 0.5em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    margin-top: 1em;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 3px var(--faint-color);
    }

    @media (max-width: 400px) {
        width: 90%; 
    }

    @media (min-width: 401px) {
        min-width: 300px; 
        padding: 0.25em 0.75em;
    }
`;