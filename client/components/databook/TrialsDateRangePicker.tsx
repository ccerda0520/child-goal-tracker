import React from 'react';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';

const DatePickerWrapper = styled('div')`
    width: 280px;
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
        background-color: #f0f8ff !important;
        color: #4a90e2;
    }
    .DayPicker-Day {
        border-radius: 0 !important;
    }
    .DayPicker-Day--start {
        border-top-left-radius: 50% !important;
        border-bottom-left-radius: 50% !important;
    }
    .DayPicker-Day--end {
        border-top-right-radius: 50% !important;
        border-bottom-right-radius: 50% !important;
    }
`;

interface Props {
    from: any;
    to: any;
    onResetClick: any;
    onDayClick: any;
}

const TrialsDateRangePicker: React.FC<Props> = ({ from, to, onResetClick, onDayClick }) => {
    const modifiers = { start: from, end: to };
    return (
        <div>
            <p>
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
                {from &&
                    to &&
                    `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                {from && to && (
                    <button className="link" onClick={onResetClick}>
                        Reset
                    </button>
                )}
            </p>
            <DatePickerWrapper>
                <DayPicker numberOfMonths={1} selectedDays={[from, { from, to }]} modifiers={modifiers} onDayClick={onDayClick} />
            </DatePickerWrapper>
        </div>
    );
};

export default TrialsDateRangePicker;
