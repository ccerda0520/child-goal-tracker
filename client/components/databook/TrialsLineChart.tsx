import React from 'react';
import { VictoryChart, VictoryContainer, VictoryLine, VictoryTheme } from 'victory';
import { useGetTrialsByRangeQuery } from '../../generated/apolloComponents';
import Spinner from '../Spinner';

interface Props {
    goalId: number;
    from: Date;
    to: Date;
}

const TrialsLineChart: React.FC<Props> = ({ goalId, from, to }) => {
    const { data, loading, errors } = useGetTrialsByRangeQuery({
        suspend: false,
        fetchPolicy: 'cache-and-network',
        variables: {
            data: {
                goalId: goalId,
                start: from,
                end: to,
            },
        },
    });

    if (loading) {
        return <Spinner />;
    }

    if (errors) {
        return <div>Issues loading goal trials. Please try refreshing the page.</div>;
    }

    if (!data!.getTrialsByRange) {
        return <div>No trials found for this student during this date range.</div>;
    }

    return (
        <div>
            <VictoryChart
                theme={VictoryTheme.material}
                animate={{ duration: 2000 }}
                containerComponent={<VictoryContainer title="Chart" desc="This is a chart" />}
            >
                <VictoryLine
                    style={{
                        data: { stroke: '#c43a31' },
                        parent: { border: '1px solid #ccc' },
                    }}
                    data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 7 }]}
                />
            </VictoryChart>
        </div>
    );
};

export default TrialsLineChart;
