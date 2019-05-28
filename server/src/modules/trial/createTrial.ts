import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
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
        success,
        goalId,
    }: CreateTrialInput): Promise<Trial> {
        /**
         * @todo check if goal belongs to student of current session user, prob using middleware
         */
        return await Trial.create({
            success,
            goalId,
        }).save();
    }
}
