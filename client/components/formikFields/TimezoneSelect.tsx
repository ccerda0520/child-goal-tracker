import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button';
import { FieldProps } from 'formik';
import styled from 'styled-components';
import timezones from '../../helpers/timezones';
import { Error } from '../presentational/CommonStyles';
import { gray, lightBlue } from '../presentational/variables';

interface LabelTextProps {
    isLabelVisible: boolean;
}

interface CustomProps {
    label: string;
    isLabelVisible?: boolean;
}

const MenuWrapper = styled('div')`
    button {
        color: black;
        font-size: 17px;
        line-height: 1;
        padding: 10px 15px;
        border: 1px solid ${gray};
        border-radius: 5px;
        width: 100%;
        text-align: left;
        background: none;
        span {
            float: right;
        }
    }
`;

const InputFieldWrapper = styled('div')`
    margin-bottom: 25px;
`;

const GoalMenuList = styled(MenuList)`
    padding: 0;
    width: 400px;
    height: 400px;
    overflow-y: scroll;
    [data-reach-menu-item] {
        font-size: 15px;
        padding: 10px 15px;
    }
    [data-reach-menu-item][data-selected] {
        background: ${lightBlue};
    }
`;

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

const TimezoneSelect: React.FC<FieldProps & CustomProps> = ({ field, form, isLabelVisible, label }) => {
    const timezoneValue = timezones.find((timezone) => timezone.tzCode === field.value);
    return (
        <InputFieldWrapper>
            <label aria-label={'Please select a goal:'}>
                <LabelText isLabelVisible={!!isLabelVisible}>{label}</LabelText>
                <MenuWrapper>
                    <Menu>
                        <MenuButton>
                            {timezoneValue ? timezoneValue.label : 'Select Your Timezone'}
                            <span aria-hidden>▾</span>
                        </MenuButton>

                        <GoalMenuList>
                            {timezones.map((timezone) => (
                                <MenuItem
                                    key={timezone.tzCode}
                                    onSelect={() => {
                                        form.setFieldValue(field.name, timezone.tzCode);
                                    }}
                                >
                                    <span>{timezone.label}</span>
                                </MenuItem>
                            ))}
                        </GoalMenuList>
                    </Menu>
                </MenuWrapper>
                {form.touched[field.name] && form.errors[field.name] && <Error>{form.errors[field.name]}</Error>}
            </label>
        </InputFieldWrapper>
    );
};

export default TimezoneSelect;
