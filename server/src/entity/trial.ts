import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {Goal} from "./goal";
import {Field, ID, ObjectType} from "type-graphql";

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
    @ManyToOne(() => Goal, goal => goal.trials)
    goal: Goal;
}