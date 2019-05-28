import { MiddlewareFn } from 'type-graphql';
import { Goal } from '../../entity/goal';
import { Student } from '../../entity/student';
import { MyContext } from '../../types/myContext';

export const isGoalOwnedByUser: MiddlewareFn<MyContext> = async ({ args, context }, next) => {
    const goal = await Goal.findOne(args.goalId, { relations: ['student'] });
    if (!goal) {
        return undefined;
    }
    const student = await Student.findOne(goal.student.id, { relations: ['user'] });

    if (!student || student.user.id !== context.req.session!.userId) {
        return [];
    }

    await next();
};
