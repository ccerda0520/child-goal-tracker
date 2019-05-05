import {Arg, Mutation, Query, Resolver} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../entity/User";
import {RegisterInput} from "./register/registerInput";
import {sendEmail} from "../utls/sendEmail";
import {createConfirmationUrl} from "../utls/createConfirmationUrl";

@Resolver(User)
export class RegisterResolver {
    @Query(returns => String)
    async hello() {
        return "Hello World";
    }

    @Mutation(() => User)
    async register(
        @Arg('data') {email, firstName, lastName, password}: RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword
        }).save();

        await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }

}