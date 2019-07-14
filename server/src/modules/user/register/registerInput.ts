import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { PasswordInput } from '../../shared/passwordInput';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: 'Email already exists.' })
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    timeZone: string;
}
