import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany} from "typeorm";
import {Student} from "./student";
import {Trial} from "./trial";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Goal extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({type: "text"})
    name: string;

    @Field()
    @Column({type: "text"})
    description: string;

    @Field(() => Number)
    @Column()
    trialsPerDay: number;

    @Field()
    @Column({default: true})
    active: boolean;

    @Field()
    @Column({nullable: true})
    completed: boolean;

    @Field(() => Number)
    @Column()
    studentId: number;

    @Field(() => Student)
    @ManyToOne(() => Student, student => student.goals)
    student: Student;

    @Field(() => [Trial])
    @OneToMany(() => Trial, trial => trial.goal)
    trials: Trial[];
}