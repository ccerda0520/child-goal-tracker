import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTrialInput {
    @Field()
    success: boolean;

    @Field()
    goalId: number;
}
