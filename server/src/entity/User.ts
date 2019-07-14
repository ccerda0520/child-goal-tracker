import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: 'text', unique: true })
    email: string;

    @Field()
    @Column({ type: 'varchar', length: '230', nullable: true })
    firstName: string;

    @Field()
    @Column({ type: 'varchar', length: '230', nullable: true })
    lastName: string;

    @Column({ type: 'text' })
    password: string;

    @Field()
    @Column({ type: 'text', nullable: true })
    timeZone: string;

    @Column({ type: 'boolean', default: false })
    confirmed: boolean;

    @Field(() => [String])
    @Column({ type: 'text', array: true, nullable: true, default: '{"user"}' })
    roles: string[];

    @Field(() => [Student], { nullable: true })
    @OneToMany((type) => Student, (student) => student.user)
    students: Student[];
}
