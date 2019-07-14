import { UserInputError } from 'apollo-server-core';
import { DateTime } from 'luxon';
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Between } from 'typeorm';
import { Goal } from '../../entity/goal';
import { Trial } from '../../entity/trial';
import { User } from '../../entity/User';
import { isAuth } from '../middleware/isAuth';
import { isGoalOwnedByUser } from '../middleware/isGoalOwnedByUser';
import { GetTrialsByRangeInput } from './getTrialsByRange/getTrialsByRangeInput';

@Resolver(Trial)
export class GetTrialsByRangeResolver {
    @UseMiddleware([isAuth, isGoalOwnedByUser])
    @Query((returns) => [Trial], { nullable: true })
    async getTrialsByRange(@Arg('data') data: GetTrialsByRangeInput): Promise<Trial[] | undefined> {
        const goal = await Goal.findOne({
            relations: ['student'],
            where: {
                id: data.goalId,
            },
        });

        if (!goal) {
            throw new UserInputError('No Goal exists with given goalId.');
        }

        const user = await User.findOne(goal.student.userId);

        const startDate = DateTime.fromJSDate(data.start).toUTC();
        const endDate = DateTime.fromJSDate(data.end).toUTC();

        return Trial.find({
            relations: ['goal'],
            where: {
                goalId: data.goalId,
                createdAt: Between(startDate.startOf('day').setZone(user!.timeZone), endDate.endOf('day').setZone(user!.timeZone)),
            },
        });
    }
}
