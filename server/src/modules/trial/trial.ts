import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Equal } from 'typeorm';
import { Trial } from '../../entity/trial';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class TrialResolver {
    @UseMiddleware([isAuth])
    @Query((returns) => Trial, { nullable: true })
    async trial(@Arg('goalId') goalId: number): Promise<Trial | undefined> {
        return Trial.findOne({
            relations: ['goal'],
            where: {
                goalId: Equal(goalId),
            },
        });
    }
}
