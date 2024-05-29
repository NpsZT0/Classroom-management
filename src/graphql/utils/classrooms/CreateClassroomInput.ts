import { Field, InputType, Int } from "@nestjs/graphql";
import { ClassroomMembers } from "src/graphql/models/ClassroomMembers";

@InputType()
export class CreateClassroomInput {
    @Field()
    roomNumber: string;

    @Field()
    roomName: string;

    @Field()
    schoolYear: string;

    @Field()
    teacherName: string;
}