import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import {redis} from "../../redis";
import {sendEmail} from "../utls/sendEmail";
import {createConfirmationUrl} from "../utls/createConfirmationUrl";
import {v4} from 'uuid';
import {User} from "../../entity/User";
import {forgotPasswordPrefix} from "../constants/redisConstants";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean, {nullable: true})
    async forgotPassword(
        @Arg('email') email: string,
    ): Promise<boolean> {
        const user = await User.findOne({where: {email}});

        if(!user) {
            return true;
        }

        const token = v4();
        await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60*60*24);

        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);


        return true;
    }

}