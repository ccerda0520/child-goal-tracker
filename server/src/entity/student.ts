import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany} from "typeorm";
import {User} from "./User";
import {Goal} from "./goal";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Student extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({type: "text"})
    firstName!: string;

    @Field()
    @Column({type: "text"})
    lastName!: string;

    @Field(() => Number)
    @Column()
    userId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.students)
    user: User;

    @Field(() => [Goal])
    @OneToMany(() => Goal, goal => goal.student)
    goals: Goal[];
}