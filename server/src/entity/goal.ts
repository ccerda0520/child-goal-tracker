import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student';
import { Trial } from './trial';

@ObjectType()
@Entity()
export class Goal extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: 'text' })
    name: string;

    @Field()
    @Column({ type: 'text' })
    description: string;

    @Field(() => Number)
    @Column()
    trialsPerDay: number;

    @Field()
    @Column({ type: 'text' })
    category: string;

    @Field()
    @Column({ default: true })
    active: boolean;

    @Field()
    @Column({ nullable: true })
    completed: boolean;

    @Field(() => Number)
    @Column()
    studentId: number;

    @Field(() => Student)
    @ManyToOne(() => Student, (student) => student.goals)
    student: Student;

    @Field(() => [Trial])
    @OneToMany(() => Trial, (trial) => trial.goal)
    trials: Trial[];
}
