import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClassroomMembers } from "./ClassroomMembers";

@Entity({ name: 'classrooms' })
@ObjectType()
export class Classrooms {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column({ name: 'room_number' })
    @Field()
    roomNumber: string;

    @Column({ name: 'room_name' })
    @Field()
    roomName: string;

    @Column({ name: 'school_year', type: 'year' })
    @Field()
    schoolYear: string;

    @Column({ name: 'teacher_name' })
    @Field()
    teacherName: string;

    @OneToMany(() => ClassroomMembers, (classroomMembers) => classroomMembers.classroom)
    classroomMembers?: ClassroomMembers[];
}