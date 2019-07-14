import bcrypt from 'bcryptjs';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { createConfirmationUrl } from '../utls/createConfirmationUrl';
import { sendEmail } from '../utls/sendEmail';
import { RegisterInput } from './register/registerInput';

@Resolver(User)
export class RegisterResolver {
    @Mutation(() => User)
    async register(@Arg('data') { email, firstName, lastName, password, timeZone }: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            timeZone,
        }).save();

        await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }
}
