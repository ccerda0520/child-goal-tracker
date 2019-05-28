import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateGoalInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    trialsPerDay: number;

    @Field()
    category: string;

    @Field()
    studentId: number;
}
