import { Module } from "@nestjs/common";
import { UsersResolver } from "./UsersResolver";
import { UsersService } from "./UsersService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/graphql/models/Users";
import { Classrooms } from "src/graphql/models/Classrooms";
import { ClassroomMembers } from "src/graphql/models/ClassroomMembers";
import { ClassroomMembersModule } from "src/classroom_members/classroomMembers.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Classrooms, ClassroomMembers]),
        ClassroomMembersModule,
    ],
    providers: [UsersResolver, UsersService]
})
export class UsersModule {}