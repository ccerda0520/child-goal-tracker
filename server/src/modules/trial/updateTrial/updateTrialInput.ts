import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateTrialInput {
    @Field(() => [Boolean])
    trialData: boolean[];

    @Field()
    id: number;
}
