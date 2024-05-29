import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classrooms } from "src/graphql/models/Classrooms";
import { ClassroomsResolver } from "./ClassroomsResolver";
import { ClassroomsService } from "./ClassroomsService";
import { ClassroomMembersModule } from "src/classroom_members/classroomMembers.module";
import { ClassroomMembers } from "src/graphql/models/ClassroomMembers";
import { Users } from "src/graphql/models/Users";

@Module({
    imports: [
        TypeOrmModule.forFeature([Classrooms, ClassroomMembers, Users]),
        ClassroomMembersModule,
    ],
    providers: [ClassroomsResolver, ClassroomsService],
    exports: [ClassroomsService]
})
export class ClassroomsModule {}