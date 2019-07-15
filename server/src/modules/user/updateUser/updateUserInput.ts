import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    timeZone: string;

    @Field({ nullable: true })
    @MinLength(5)
    password: string;
}
