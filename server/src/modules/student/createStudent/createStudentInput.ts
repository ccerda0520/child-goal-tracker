import {Field, InputType} from "type-graphql";

@InputType()
export class CreateStudentInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;
}