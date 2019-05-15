import styled from 'styled-components';

export const Button = styled('button')`
    font-size: 15px;
    display: inline-block;
    font-family: 'Lato';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0;
    line-height: 1;
    color: #337abb;
    border: 2px solid #337abb;
    border-radius: 0;
    background: transparent;
    padding: 10px 35px;
    cursor: pointer;
    &:hover,
    &:focus {
        color: white;
        background: #337abb;
    }
    &:disabled {
        opacity: 0.75;
    }
`;

export const Error = styled('div')`
    color: #ff0033;
    font-family: 'Lato';
`;
