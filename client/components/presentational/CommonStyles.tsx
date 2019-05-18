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

interface LabelTextProps {
    isLabelVisible: boolean;
}

export const LabelText = styled('span')`
    border: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : 0)};
    clip: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : 'rect(1px, 1px, 1px, 1px)')};
    clip-path: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : 'inset(50%)')};
    height: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : '1px')};
    margin: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : '-1px')};
    overflow: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : 'hidden')};
    padding: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : 0)};
    position: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : 'absolute')};
    width: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : '1px')};
    word-wrap: ${(props: LabelTextProps) => (props.isLabelVisible ? 'inherit' : 'normal !important')};
`;
