import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTrialInput {
    @Field(() => [Boolean])
    trialData: boolean[];

    @Field()
    goalId: number;
}
