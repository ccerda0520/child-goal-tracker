import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Goal } from './goal';

@ObjectType()
@Entity()
export class Trial extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    success: boolean;

    @Field(() => Number)
    @Column()
    goalId: number;

    @Field(() => Goal)
    @ManyToOne(() => Goal, (goal) => goal.trials)
    goal: Goal;
}
