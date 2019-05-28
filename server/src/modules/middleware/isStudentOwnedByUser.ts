import { MiddlewareFn } from 'type-graphql';
import { Student } from '../../entity/student';
import { MyContext } from '../../types/myContext';

export const isStudentOwnedByUser: MiddlewareFn<MyContext> = async ({ args, context }, next) => {
    const student = await Student.findOne(args.studentId, { relations: ['user'] });

    if (!student || student.user.id !== context.req.session!.userId) {
        return [];
    }

    await next();
};
