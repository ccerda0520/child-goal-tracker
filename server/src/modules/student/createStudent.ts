import {Arg, Ctx, Mutation, Resolver, UseMiddleware} from "type-graphql";
import {Student} from "../../entity/student";
import {CreateStudentInput} from "./createStudent/createStudentInput";
import {isAuth} from "../middleware/isAuth";
import {MyContext} from "../../types/myContext";

@Resolver()
export class CreateStudentResolver {

    @UseMiddleware(isAuth)
    @Mutation(() => Student)
    async createStudent(
        @Arg('data')
        {firstName, lastName}: CreateStudentInput,
        @Ctx() ctx: MyContext
    ): Promise<Student> {

        return await Student.create({
            firstName,
            lastName,
            userId: ctx.req.session!.userId
        }).save();
    }
}