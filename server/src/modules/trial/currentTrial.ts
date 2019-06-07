import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Between } from 'typeorm';
import { Trial } from '../../entity/trial';
import { isAuth } from '../middleware/isAuth';
import { isGoalOwnedByUser } from '../middleware/isGoalOwnedByUser';

@Resolver()
export class CurrentTrialResolver {
    @UseMiddleware([isAuth, isGoalOwnedByUser])
    @Query((returns) => Trial, { nullable: true })
    async currentTrial(@Arg('goalId') goalId: number): Promise<Trial | undefined> {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 59);

        return Trial.findOne({
            relations: ['goal'],
            where: {
                goalId: goalId,
                createdAt: Between(start, end),
            },
        });
    }
}
