import {Field, InputType} from "type-graphql";
import {IsEmail, Min} from "class-validator";
import {IsEmailAlreadyExist} from "./isEmailAlreadyExist";
import {PasswordInput} from "../../shared/passwordInput";

@InputType()
export class RegisterInput extends PasswordInput{
    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message: "Email already exists."})
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}