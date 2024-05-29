import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { ClassroomMembers } from "src/graphql/models/ClassroomMembers";
import { ClassroomMembersResolver } from "./ClassroomMembersResolver";
import { ClassroomMembersService } from "./ClassroomMembersService";

@Module({
    imports: [
        TypeOrmModule.forFeature([ClassroomMembers])
    ],
    providers: [ClassroomMembersResolver, ClassroomMembersService],
    exports: [ClassroomMembersService]
})
export class ClassroomMembersModule { }