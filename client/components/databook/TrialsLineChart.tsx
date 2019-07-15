import React from 'react';
import styled from 'styled-components';
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLine, VictoryScatter, VictoryTheme } from 'victory';
import { useGetTrialsByRangeQuery } from '../../generated/apolloComponents';
import { lightBlue } from '../presentational/variables';
import Spinner from '../Spinner';

interface Props {
    goalId: string;
    from: Date;
    to: Date;
}

const ChartWrapper = styled('div')`
    width: auto;
    padding: 1em;
    background: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
    margin-left: 35px;
`;

const ChartTitle = styled('h3')`
    text-align: center;
`;

const TrialsLineChart: React.FC<Props> = ({ goalId, from, to }) => {
    const { data, loading, errors } = useGetTrialsByRangeQuery({
        suspend: false,
        fetchPolicy: 'cache-and-network',
        variables: {
            data: {
                goalId: parseInt(goalId),
                start: from,
                end: to,
            },
        },
    });

    if (loading) {
        return <Spinner />;
    }

    if (errors || data === undefined) {
        return <div>Issues loading goal trials. Please try refreshing the page.</div>;
    }

    if (!data!.getTrialsByRange!.length || data!.getTrialsByRange === null) {
        return <div>No trials found for this student during this date range.</div>;
    }

    const trialsPerDay = data!.getTrialsByRange[0].goal.trialsPerDay;
    let dataPoints: any = [];
    data!.getTrialsByRange.forEach((trial, index) => {
        const date = new Date(trial.createdAt);
        const month = date.getMonth();
        const day = date.getDate();
        const xValue = {
            value: index + 1,
            label: month + 1 + '/' + day,
        };
        const yValue = trial.trialData.filter((val) => val === true).length / trial.goal.trialsPerDay;
        dataPoints.push({ x: xValue.label, y: yValue });
        console.log(dataPoints);
    });
    return (
        <ChartWrapper>
            <ChartTitle>Trial Success Rate</ChartTitle>
            <VictoryChart
                theme={VictoryTheme.material}
                animate={{ duration: 1000 }}
                containerComponent={<VictoryContainer title="Chart" desc="This is a chart" />}
                height={400}
                width={720}
            >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 15,
                        },
                    }}
                />
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 15,
                        },
                    }}
                    dependentAxis
                    domain={[0, 1]}
                    tickValues={[0, 0.2, 0.4, 0.6, 0.8, 1]}
                    tickFormat={(t) => `${t * 100}%`}
                />
                <VictoryLine
                    style={{
                        data: {
                            stroke: lightBlue,
                        },
                        parent: { border: '1px solid #ccc' },
                    }}
                    data={dataPoints}
                />
                <VictoryScatter
                    data={dataPoints}
                    size={9}
                    style={{
                        labels: {
                            fontSize: 15,
                            padding: 15,
                            backgroundColor: 'red',
                        },
                    }}
                    labels={(datum) => ''}
                    events={[
                        {
                            target: 'data',
                            eventHandlers: {
                                onMouseOver: () => {
                                    return [
                                        {
                                            target: 'data',
                                            mutation: (props) => {
                                                const fill = props.style && props.style.fill;
                                                return fill === 'black' ? null : { style: { fill: 'black' } };
                                            },
                                        },
                                        {
                                            target: 'labels',
                                            mutation: (props) => {
                                                return {
                                                    text: `${props.datum.y * trialsPerDay} / ${trialsPerDay} passed`,
                                                };
                                            },
                                        },
                                    ];
                                },
                                onMouseOut: () => {
                                    return [
                                        {
                                            target: 'data',
                                            mutation: (props) => {
                                                const fill = props.style && props.style.fill;
                                                return fill === 'black' ? null : { style: { fill: 'black' } };
                                            },
                                        },
                                        {
                                            target: 'labels',
                                            mutation: (props) => {
                                                console.log(props);
                                                return {
                                                    text: '',
                                                };
                                            },
                                        },
                                    ];
                                },
                            },
                        },
                    ]}
                />
            </VictoryChart>
        </ChartWrapper>
    );
};

export default TrialsLineChart;
