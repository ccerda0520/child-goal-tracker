import { UserInputError } from 'apollo-server-core';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Goal } from '../../entity/goal';
import { Trial } from '../../entity/trial';
import { isAuth } from '../middleware/isAuth';
import { isGoalOwnedByUser } from '../middleware/isGoalOwnedByUser';
import { UpdateTrialInput } from './updateTrial/updateTrialInput';

@Resolver()
export class UpdateTrialResolver {
    @UseMiddleware([isAuth, isGoalOwnedByUser])
    @Mutation(() => Trial)
    async updateTrial(@Arg('data')
    {
        trialData,
        id,
    }: UpdateTrialInput): Promise<Trial> {
        const trial = await Trial.findOne(id);

        if (!trial) {
            throw new UserInputError('No Trial exists with given id.');
        }

        const goal = await Goal.findOne(trial.goalId);

        if (!goal) {
            throw new UserInputError('No Goal exists with given goalId assigned in trial.');
        }

        if (trialData.length > goal.trialsPerDay) {
            throw new UserInputError('Argument trialData has more trial entries than goal allows.');
        }

        trial.trialData = trialData;

        return await trial.save();
    }
}
