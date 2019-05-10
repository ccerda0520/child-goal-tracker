import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/myContext";
import { isAuth } from "../middleware/isAuth";

@Resolver(User)
export class MeResolver {
    @UseMiddleware(isAuth)
    @Query((returns) => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session!.userId) {
            return undefined;
        }

        return User.findOne(ctx.req.session!.userId, {
            relations: ["students"],
        });
    }
}
