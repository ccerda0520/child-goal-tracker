import { UserInputError } from 'apollo-server-core';
import { DateTime } from 'luxon';
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Between } from 'typeorm';
import { Goal } from '../../entity/goal';
import { Trial } from '../../entity/trial';
import { User } from '../../entity/User';
import { isAuth } from '../middleware/isAuth';
import { isGoalOwnedByUser } from '../middleware/isGoalOwnedByUser';

@Resolver()
export class CurrentTrialResolver {
    @UseMiddleware([isAuth, isGoalOwnedByUser])
    @Query((returns) => Trial, { nullable: true })
    async currentTrial(@Arg('goalId') goalId: number): Promise<Trial | undefined> {
        const goal = await Goal.findOne({
            relations: ['student'],
            where: {
                id: goalId,
            },
        });

        if (!goal) {
            throw new UserInputError('No Goal exists with given goalId.');
        }

        const user = await User.findOne(goal.student.userId);

        const date = DateTime.utc();

        return Trial.findOne({
            relations: ['goal'],
            where: {
                goalId: goalId,
                createdAt: Between(date.startOf('day').setZone(user!.timeZone), date.endOf('day').setZone(user!.timeZone)),
            },
        });
    }
}
