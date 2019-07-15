import bcrypt from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types/myContext';
import { UpdateUserInput } from './updateUser/updateUserInput';

@Resolver()
export class UpdateUserResolver {
    @Mutation(() => Boolean, { nullable: true })
    async updateUser(@Arg('data') data: UpdateUserInput, @Ctx() ctx: MyContext): Promise<boolean> {
        const user = await User.findOne(ctx.req.session!.userId);

        if (!user) {
            return false;
        }

        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 12);
            user.password = hashedPassword;
        }

        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.timeZone = data.timeZone;

        await user.save();

        return true;
    }
}
