import styled from 'styled-components';

const SliderContainer = styled.div`
    margin-bottom: 2rem;
    margin-top: 2rem;
`;

const SliderInput = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: var(--faint-color);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--fg-color);
        cursor: pointer;
    }

    &:hover::-webkit-slider-thumb {
        opacity: 1;
    }
`;

export {SliderInput, SliderContainer};