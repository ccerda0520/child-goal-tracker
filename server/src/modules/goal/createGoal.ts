import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Goal } from '../../entity/goal';
import { MyContext } from '../../types/myContext';
import { isAuth } from '../middleware/isAuth';
import { CreateGoalInput } from './createGoal/createGoalInput';

@Resolver()
export class CreateGoalResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Goal)
    async createGoal(
        @Arg('data')
        { name, description, trialsPerDay, category, studentId }: CreateGoalInput,
        @Ctx() ctx: MyContext,
    ): Promise<Goal> {
        /**
         * @todo check if student belongs to current session user, prob using middleware
         */
        return await Goal.create({
            name,
            description,
            trialsPerDay,
            category,
            studentId,
        }).save();
    }
}
