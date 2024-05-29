import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClassroomMembers } from "./ClassroomMembers";

@Entity({ name: 'users' })
@ObjectType()
export class Users {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column({ name: 'std_id' })
    @Field()
    stdId: string;

    @Column()
    @Field()
    prefix: string;

    @Column({ name: 'first_name' })
    @Field()
    firstName: string;

    @Column({ name: 'last_name' })
    @Field()
    lastName: string;

    @Column({ nullable: true, default: null })
    @Field({ nullable: true })
    gender?: string;

    @Column({ name: 'birthday', type: 'date' })
    @Field()
    birthday: string;

    @Column({ name: 'grade_level' })
    @Field((type) => Int)
    gradeLevel: number;

    @OneToMany(() => ClassroomMembers, (classroomMembers) => classroomMembers.std)
    classroomMembers?: ClassroomMembers[];
}