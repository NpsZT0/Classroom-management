import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { Classrooms } from "./Classrooms";

@Entity({ name: 'classroom_members' })
@ObjectType()
export class ClassroomMembers {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @ManyToOne(() => Classrooms, (classrooms) => classrooms.classroomMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
        nullable: true
    })
    @JoinColumn({ name: 'classroom_id' })
    @Field((type) => Classrooms, { nullable: true })
    classroom?: Classrooms;
    
    @ManyToOne(() => Users, (users) => users.classroomMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
        nullable: true
    })
    @JoinColumn({ name: 'std_id' })
    @Field((type) => Users, { nullable: true })
    std?: Users;
}