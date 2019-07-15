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
    width: 100%;
    ::placeholder,
    ::-webkit-input-placeholder {
        color: #a6a5a5;
    }
    :-ms-input-placeholder {
        color: #a6a5a5;
    }
`;
const TextArea = styled('textarea')`
    color: black;
    font-size: 17px;
    line-height: 1;
    padding: 10px 15px;
    border: 1px solid #585858;
    border-radius: 5px;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    min-height: 50px;
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
    border: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : 0)};
    clip: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : 'rect(1px, 1px, 1px, 1px)')};
    clip-path: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : 'inset(50%)')};
    height: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : '1px')};
    margin: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : '-1px')};
    overflow: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : 'hidden')};
    padding: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : 0)};
    position: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : 'absolute')};
    width: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : '1px')};
    word-wrap: ${(props: LabelTextProps) => (props.isLabelVisible ? 'initial' : 'normal !important')};
    display: ${(props: LabelTextProps) => (props.isLabelVisible ? 'block' : 'initial')};
    margin-bottom: ${(props: LabelTextProps) => (props.isLabelVisible ? '5px' : 'initial')};
`;

const InputField: React.FunctionComponent<FieldProps & InputProps & CustomProps> = ({
    field,
    form: { errors, touched },
    label,
    isLabelVisible,
    ref,
    ...props
}) => {
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

export const TextAreaField: React.FunctionComponent<FieldProps & InputProps & CustomProps> = ({
    field,
    form: { errors, touched },
    label,
    isLabelVisible,
    placeholder,
}) => {
    return (
        <InputFieldWrapper>
            <label>
                <LabelText isLabelVisible={!!isLabelVisible}>{label}</LabelText>
                <TextArea {...field} placeholder={placeholder} />
                {touched[field.name] && errors[field.name] && <Error>{errors[field.name]}</Error>}
            </label>
        </InputFieldWrapper>
    );
};

export default InputField;
