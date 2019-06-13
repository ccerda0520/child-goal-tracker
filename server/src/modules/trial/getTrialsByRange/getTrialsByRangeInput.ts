import { Field, InputType } from 'type-graphql';

@InputType()
export class GetTrialsByRangeInput {
    @Field()
    goalId: number;

    @Field()
    start: Date;

    @Field()
    end: Date;
}
