import { FieldProps } from 'formik';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

interface CustomProps {
    label: string;
    isLabelVisible?: boolean;
}

const InputField: React.FunctionComponent<
    FieldProps & InputProps & CustomProps
> = ({ field, form: { errors, touched }, label, isLabelVisible, ...props }) => {
    return (
        <div>
            <label>
                <span className={isLabelVisible ? '' : 'screen-reader-text'}>
                    {label}
                </span>

                {touched[field.name] && errors[field.name] && (
                    <div className="error">{errors[field.name]}</div>
                )}
            </label>
            <input {...field} {...props} />
        </div>
    );
};

export default InputField;
