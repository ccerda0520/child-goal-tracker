import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Goal } from './goal';

@ObjectType()
@Entity()
export class Trial extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => [Boolean])
    @Column({ type: 'bool', array: true, nullable: true })
    trialData: boolean[];

    @Field(() => Number)
    @Column()
    goalId: number;

    @Field(() => Goal)
    @ManyToOne(() => Goal, (goal) => goal.trials)
    goal: Goal;
}
