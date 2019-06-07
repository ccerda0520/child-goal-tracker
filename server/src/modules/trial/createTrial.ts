import { UserInputError } from 'apollo-server-core';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Between } from 'typeorm';
import { Goal } from '../../entity/goal';
import { Trial } from '../../entity/trial';
import { isAuth } from '../middleware/isAuth';
import { isGoalOwnedByUser } from '../middleware/isGoalOwnedByUser';
import { CreateTrialInput } from './createTrial/createTrialInput';

@Resolver()
export class CreateTrialResolver {
    @UseMiddleware([isAuth, isGoalOwnedByUser])
    @Mutation(() => Trial)
    async createTrial(@Arg('data')
    {
        trialData,
        goalId,
    }: CreateTrialInput): Promise<Trial> {
        const goal = await Goal.findOne(goalId);

        if (!goal) {
            throw new UserInputError('No Goal exists with given goalId.');
        }
        if (trialData.length > goal.trialsPerDay) {
            throw new UserInputError('Argument trialData has more trial entries than goal allows.');
        }

        // const start = moment.utc().startOf('day');
        // const end = moment.utc().endOf('day');
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 59);

        const trial = await Trial.findOne({
            relations: ['goal'],
            where: {
                goalId: goalId,
                createdAt: Between(start, end),
            },
        });

        if (trial) {
            throw new UserInputError('Current day Trial data for this goal already exists.');
        }

        return await Trial.create({
            trialData,
            goalId,
        }).save();
    }
}
