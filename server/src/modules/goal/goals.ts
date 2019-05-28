import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Equal } from 'typeorm';
import { Goal } from '../../entity/goal';
import { isAuth } from '../middleware/isAuth';
import { isStudentOwnedByUser } from '../middleware/isStudentOwnedByUser';

@Resolver(Goal)
export class GoalsResolver {
    @UseMiddleware([isAuth, isStudentOwnedByUser])
    @Query((returns) => [Goal], { nullable: true })
    async goals(@Arg('studentId') studentId: number): Promise<Goal[] | undefined> {
        return Goal.find({
            relations: ['student', 'trials'],
            where: {
                studentId: Equal(studentId),
            },
        });
    }
}
