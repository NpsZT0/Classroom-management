import { Module } from "@nestjs/common";
import { UsersResolver } from "./UsersResolver";
import { UsersService } from "./UsersService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/graphql/models/Users";
import { Classrooms } from "src/graphql/models/Classrooms";
import { ClassroomMembers } from "src/graphql/models/ClassroomMembers";
import { ClassroomMembersModule } from "src/classroom_members/classroomMembers.module";
import { ClassroomsModule } from "src/classrooms/classrooms.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, ClassroomMembers, Classrooms]),
        ClassroomMembersModule,
        ClassroomsModule
    ],
    providers: [UsersResolver, UsersService]
})
export class UsersModule {}