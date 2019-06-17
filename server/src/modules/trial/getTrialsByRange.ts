import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Between } from 'typeorm';
import { Trial } from '../../entity/trial';
import { isAuth } from '../middleware/isAuth';
import { isGoalOwnedByUser } from '../middleware/isGoalOwnedByUser';
import { GetTrialsByRangeInput } from './getTrialsByRange/getTrialsByRangeInput';

@Resolver(Trial)
export class GetTrialsByRangeResolver {
    @UseMiddleware([isAuth, isGoalOwnedByUser])
    @Query((returns) => [Trial], { nullable: true })
    async getTrialsByRange(@Arg('data') data: GetTrialsByRangeInput): Promise<Trial[] | undefined> {
        return Trial.find({
            relations: ['goal'],
            where: {
                goalId: data.goalId,
                createdAt: Between(data.start, data.end),
            },
        });
    }
}
