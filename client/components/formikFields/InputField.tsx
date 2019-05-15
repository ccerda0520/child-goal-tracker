import { FieldProps } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Error } from '../presentational/CommonStyles';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomProps {
    label: string;
    isLabelVisible?: boolean;
}

const InputFieldWrapper = styled('div')`
    margin-bottom: 25px;
`;

const Input = styled('input')`
    color: black;
    font-size: 17px;
    line-height: 1;
    padding: 10px 15px;
    border: 1px solid #585858;
    border-radius: 5px;
    ::placeholder,
    ::-webkit-input-placeholder {
        color: #a6a5a5;
    }
    :-ms-input-placeholder {
        color: #a6a5a5;
    }
`;

interface LabelTextProps {
    isLabelVisible: boolean;
}

const LabelText = styled('span')`
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

const InputField: React.FunctionComponent<FieldProps & InputProps & CustomProps> = ({ field, form: { errors, touched }, label, isLabelVisible, ...props }) => {
    return (
        <InputFieldWrapper>
            <label>
                <LabelText isLabelVisible={!!isLabelVisible}>{label}</LabelText>
                <Input {...field} {...props} />
                {touched[field.name] && errors[field.name] && <Error>{errors[field.name]}</Error>}
            </label>
        </InputFieldWrapper>
    );
};

export default InputField;
