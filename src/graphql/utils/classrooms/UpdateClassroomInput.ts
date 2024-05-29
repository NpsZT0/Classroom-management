import { Field, InputType, Int } from "@nestjs/graphql";
import { ClassroomMembers } from "src/graphql/models/ClassroomMembers";

@InputType()
export class UpdateClassroomInput {
    @Field({ nullable: true })
    roomNumber?: string;

    @Field({ nullable: true })
    roomName?: string;

    @Field({ nullable: true })
    schoolYear?: string;

    @Field({ nullable: true })
    teacherName?: string;
}