import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Goal } from '../../entity/goal';
import { Student } from '../../entity/student';
import { User } from '../../entity/User';
import { MyContext } from '../../types/myContext';
import { UpdateGoalInput } from './updateGoal/updateGoalInput';

@Resolver()
export class UpdateGoalResolver {
    @Mutation(() => Boolean, { nullable: true })
    async updateGoal(@Arg('data') data: UpdateGoalInput, @Ctx() ctx: MyContext): Promise<boolean> {
        const user = await User.findOne(ctx.req.session!.userId);

        if (!user) {
            return false;
        }

        const goal = await Goal.findOne(data.id);

        if (!goal) {
            return false;
        }

        const student = await Student.findOne(goal.studentId);

        if (!student) {
            return false;
        }

        if (student.userId !== user.id) {
            return false;
        }

        if (data.name) {
            goal.name = data.name;
        }
        if (data.description) {
            goal.description = data.description;
        }

        if (data.category) {
            goal.category = data.category;
        }

        if (data.trialsPerDay) {
            goal.trialsPerDay = data.trialsPerDay;
        }

        try {
            await goal.save();
        } catch (err) {
            return false;
        }

        return true;
    }
}
