import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import { MyContext } from '../../types/myContext';
import { confirmUserPrefix } from '../constants/redisConstants';

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean, { nullable: true })
    async confirmUser(
        @Arg('token') token: string,
        @Ctx() ctx: MyContext,
    ): Promise<boolean> {
        const userId = await redis.get(confirmUserPrefix + token);

        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

        await redis.del(confirmUserPrefix + token);

        return true;
    }
}
