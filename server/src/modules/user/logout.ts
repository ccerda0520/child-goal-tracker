import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import {MyContext} from "../../types/myContext";

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(
        @Ctx() ctx: MyContext
    ): Promise<boolean> {
        return new Promise(
            (res, rej) => ctx.req.session!.destroy((err) => {
                if (err) {
                    console.log(err);
                    return rej(false);
                }

                ctx.res.clearCookie("qid");
                return res(true);
            })
        );
    }
}