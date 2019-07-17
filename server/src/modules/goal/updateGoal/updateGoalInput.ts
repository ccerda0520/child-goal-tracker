import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateGoalInput {
    @Field()
    id: number;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    trialsPerDay: number;

    @Field({ nullable: true })
    category: string;
}
